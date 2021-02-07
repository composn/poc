export default function timer() {
  return async function timerMiddleware(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log('X-Response-Time', `${ms}ms`);
  };
}
