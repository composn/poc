import find from './controllers/find';

export default {
  prefix: '/foo',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: find,
    },
  ],
};
