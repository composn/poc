import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';

export default function defineCtxRoles({
  publicRole = 'public',
  authenticatedRole = 'authenticated',
  ctxUserRolesSource = 'state.payload.user.roles',
  ctxUserAuthenticatedSource = 'state.payload',
  ctxRolesDestination = 'state.roles',
} = {}) {
  return async function defineCtxRolesMiddleware(ctx, next) {
    _set(ctx, ctxRolesDestination, [
      ..._get(
        ctx,
        ctxUserRolesSource,
        _has(ctx, ctxUserAuthenticatedSource) ? [] : [publicRole],
      ),
      ...(_has(ctx, ctxUserAuthenticatedSource) ? [authenticatedRole] : []),
    ]);
    await next();
  };
}
