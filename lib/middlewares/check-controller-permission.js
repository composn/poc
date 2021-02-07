import ac from '../access-control';

export default function checkControllerPermission(publicRole = 'public') {
  return async function checkControllerPermissionMiddleware(ctx, next) {
    const { roles = [] } = ctx.state;
    let granted = false;
    try {
      const permissions = await Promise.all(
        roles.map((role) =>
          // eslint-disable-next-line no-underscore-dangle
          ac.can(role).execute(ctx.method).on(ctx._matchedRoute),
        ),
      );
      granted = permissions.some((perm) => perm.granted);
    } catch (e) {
      granted = false;
    }
    if (!granted) {
      if (roles.includes(publicRole) || !roles.length) {
        const message =
          ctx.state.jwtOriginalError &&
          ctx.state.jwtOriginalError.message === 'invalid signature'
            ? `${ctx.state.jwtOriginalError.name}: ${ctx.state.jwtOriginalError.message}`
            : `unauthorized: unauthenticated user cannot ${ctx.method} ${ctx.path}`;
        ctx.throw(401, message);
      } else {
        ctx.throw(
          403,
          `forbidden: ${roles.map((role) => `'${role}'`).join(' and ')} role${
            roles.length > 1 ? 's' : ''
          } cannot ${ctx.method} ${ctx.path}`,
        );
      }
    }
    await next();
  };
}
