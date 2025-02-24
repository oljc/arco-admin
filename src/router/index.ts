import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { appRoutes } from './routes';
import { REDIRECT_MAIN } from './routes/base';
import { DEFAULT_ROUTE_NAME, LOGIN_ROUTE_NAME } from './constants';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: DEFAULT_ROUTE_NAME
    },
    {
      path: '/login',
      name: LOGIN_ROUTE_NAME,
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue')
    },
    ...appRoutes,
    REDIRECT_MAIN
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

createRouteGuard(router);

export default router;
