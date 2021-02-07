import Router from '@koa/router';
import path from 'path';

import glob from '../utils/glob';

export default class AutoLoadRouter {
  constructor(autoloadDir = path.resolve(process.cwd(), './api')) {
    this.autoloadDir = autoloadDir;
  }

  async load() {
    this.files = await glob('*/**/routes.js', { cwd: this.autoloadDir });
    this.configs = (
      await Promise.all(
        this.files.map((file) => import(path.resolve(this.autoloadDir, file))),
      )
    ).map((module) => module.default);
    this.routes = this.configs.reduce((acc, { prefix = '', routes }) => {
      routes.forEach((route) =>
        acc.push({
          ...route,
          prefix,
          joinPath:
            path.posix.join(prefix, route.path) === '/'
              ? '/'
              : path.posix
                  .join(prefix, route.path)
                  .replace(/\/+/g, '/')
                  .replace(/\/$/g, ''),
        }),
      );
      return acc;
    }, []);
  }

  getRouter(...middlewares) {
    this.router = new Router();
    this.routes.forEach((route) => {
      const router = new Router({ prefix: route.prefix });
      router[route.method.toLowerCase()](
        route.path,
        ...middlewares,
        ...(route.middlewares || []),
        route.handler,
      );
      this.router.use(router.routes(), router.allowedMethods());
    });
    return this.router;
  }
}
