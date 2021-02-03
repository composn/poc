export default async function find(ctx, next) {
  console.log('foo');
  ctx.body = 'foo';
}
