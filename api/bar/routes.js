import controllers from './controllers/controllers';
import timer from '../../middlewares/timer';

export default {
  prefix: '/bars',
  routes: [
    {
      method: 'get',
      path: '/',
      handler: controllers.find,
      middlewares: [timer],
    },
  ],
};
