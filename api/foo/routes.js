import find from './controllers/find';
import timer from '../../middlewares/timer';

export default {
  prefix: '/',
  routes: [
    {
      method: 'get',
      path: '/',
      handler: find,
      middlewares: [timer],
    },
  ],
};
