import { computed } from 'vue';
import type { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import { appRoutes } from '@/router/routes';
import usePermission from '@/hooks/usePermission';
import { cloneDeep } from 'lodash';

export default function useMenuTree() {
  const permission = usePermission();
  const appRoute = computed(() => {
    return appRoutes.map(el => {
      const { name, path, meta, redirect, children } = el;
      return {
        name,
        path,
        meta,
        redirect,
        children
      };
    });
  });
  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[];
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });

    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) return null;

      const collector: any = _routes.map(element => {
        // no access
        if (!permission.accessRouter(element)) {
          return null;
        }
        if (element.meta?.hideChildrenMenu || !element.children) {
          element.children = [];
          return element;
        }
        // 过滤掉 hideInMenu 的路由
        element.children = element.children.filter(
          x => x.meta?.hideInMenu !== true
        );
        // 关联子路由
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hideInMenu === false) {
          return element;
        }

        return null;
      });
      return collector.filter(Boolean);
    }
    return travel(copyRouter, 0);
  });

  return {
    menuTree
  };
}
