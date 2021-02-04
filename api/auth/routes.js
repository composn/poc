import controllers from './controllers/controllers';

export default {
  prefix: '/auth',
  routes: [{ method: 'GET', path: '/', handler: controllers.auth }],
};
