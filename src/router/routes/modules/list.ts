import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '列表页',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: '查询表格',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: '卡片列表',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
};

export default LIST;
