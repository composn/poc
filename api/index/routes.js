import ping from './controllers/ping';

export default {
  prefix: '',
  routes: [
    { method: 'GET', path: '/', handler: ping },
    { method: 'GET', path: '/ping', handler: ping },
  ],
};
