import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import koaBody from 'koa-body';
import jwt from 'koa-jwt';

import defineCtxRoles from './lib/middlewares/define-ctx-roles';
import checkControllerPermission from './lib/middlewares/check-controller-permission';
import AutoLoadRouter from './lib/auto-load-router';
import ac from './lib/access-control';

const rolesTree = {
  name: 'public',
  parents: [
    {
      name: 'authenticated',
      parents: [
        {
          name: 'admin',
        },
      ],
    },
  ],
};

const grantsObject = {
  public: {
    grants: [{ action: 'foo', resource: 'bar' }],
  },
};

ac.setGrants(grantsObject);
ac.extendsFromTree(rolesTree);

const app = new Koa();

const autoLoad = new AutoLoadRouter();
await autoLoad.load();
autoLoad.routes.forEach((route) => {
  if (route.method === 'GET' && !route.grants) {
    route.grants = [
      {
        role: 'public',
        action: 'GET',
        resource: route.joinPath,
      },
    ];
  }
  ac.addGrantsFromList(route.grants);
});
const router = autoLoad.getRouter(checkControllerPermission());

app
  .use(
    jwt({ secret: process.env.JWT_SECRET, passthrough: true, key: 'payload' }),
  )
  .use(koaBody())
  .use(defineCtxRoles())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
