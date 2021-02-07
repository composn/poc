import controllers from './controllers/controllers';
import timer from '../../middlewares/timer';

export default {
  prefix: '/bar',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: controllers.find,
      middlewares: [timer()],
    },
  ],
};
