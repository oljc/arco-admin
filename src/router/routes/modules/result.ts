import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const RESULT: AppRouteRecordRaw = {
  path: '/result',
  name: 'result',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '结果页',
    icon: 'icon-check-circle',
    requiresAuth: true,
    order: 5
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: '成功页',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'error',
      name: 'Error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: '失败页',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
};

export default RESULT;
