import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const PROFILE: AppRouteRecordRaw = {
  path: '/profile',
  name: 'profile',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '详情页',
    requiresAuth: true,
    icon: 'icon-file',
    order: 4
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        locale: '基础详情页',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
};

export default PROFILE;
