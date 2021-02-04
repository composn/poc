import Router from '@koa/router';
import path from 'path';

import glob from '../utils/glob';

export default async function autoLoadRouter({
  apiDir = path.resolve(process.cwd(), './api'),
  middlewares = [],
} = {}) {
  const router = new Router();

  const files = await glob('*/**/routes.js', { cwd: apiDir });

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const absolutePath = path.resolve(apiDir, file);
    // eslint-disable-next-line no-await-in-loop
    const { default: config } = await import(absolutePath);
    const configRouter = new Router({
      prefix: config.prefix || '',
    });
    config.routes.forEach((route) => {
      const routeMiddlewares = route.middlewares || [];
      const injectRouteMiddleware = async (ctx, next) => {
        const routeClone = { ...route };
        delete routeClone.handler;
        delete routeClone.middlewares;
        ctx.route = routeClone;
        await next();
      };
      configRouter[route.method.toLowerCase()](
        route.path,
        injectRouteMiddleware,
        ...middlewares,
        ...routeMiddlewares,
        route.handler,
      );
    });
    router.use(configRouter.routes(), configRouter.allowedMethods());
  }

  return router;
}
