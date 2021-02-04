import controllers from './controllers/controllers';

export default {
  prefix: '/bars',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: controllers.find,
    },
  ],
};
