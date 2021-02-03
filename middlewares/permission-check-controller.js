export default async function permissionCheckController(ctx, next) {
  const controllerPermission = `${ctx.method}::${ctx.path}`;
  console.log(ctx.route);
  if (ctx.query && ctx.query.cant && ctx.query.cant === controllerPermission) {
    ctx.throw(403);
  }
  await next();
}
