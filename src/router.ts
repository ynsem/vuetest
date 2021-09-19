import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/History.vue'),
    },
    {
      path: '/history/:mode',
      name: 'historyMode',
      component: () => import('./views/History.vue'),
    },
  ],
});
