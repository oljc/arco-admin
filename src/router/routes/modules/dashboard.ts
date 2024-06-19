import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: DEFAULT_LAYOUT,
  redirect: '/workplace',
  meta: {
    locale: '工作台',
    requiresAuth: true,
    hideChildrenMenu: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: '/workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        activeMenu: 'Home'
      }
    }
  ]
};

export default DASHBOARD;
