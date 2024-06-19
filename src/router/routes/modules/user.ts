import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '个人中心',
    icon: 'icon-user',
    requiresAuth: true,
    order: 7
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        locale: '用户信息',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        locale: '用户设置',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
};

export default USER;
