import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import koaBody from 'koa-body';
import jwt from 'koa-jwt';

import autoLoadRouter from './auto-load-router';
import permissionCheckController from './middlewares/permission-check-controller';

const app = new Koa();
const router = await autoLoadRouter();

app
  .use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }))
  .use(koaBody())
  .use(permissionCheckController)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
