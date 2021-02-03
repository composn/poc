import Koa from 'koa';
import autoLoadRouter from './auto-load-router';
import permissionCheckController from './middlewares/permission-check-controller';

const app = new Koa();
const router = await autoLoadRouter({
  middlewares: [permissionCheckController],
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
