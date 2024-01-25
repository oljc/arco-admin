import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';
import { DEFAULT_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants';

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (isLogin()) {
      if (userStore.role) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          await userStore.logout();
          next({
            name: LOGIN_ROUTE_NAME,
            query: {
              redirect: to.name,
              ...to.query
            } as LocationQueryRaw
          });
        }
      }
    } else {
      if (to.name === LOGIN_ROUTE_NAME) {
        next();
        return;
      }

      let query: LocationQueryRaw = { ...to.query };
      if (to.name !== DEFAULT_ROUTE_NAME) {
        query.redirect = to.name as string;
      }
      next({ name: LOGIN_ROUTE_NAME, query });
    }
  });
}
