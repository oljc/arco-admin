import type { defineComponent } from 'vue';
import type { RouteMeta, NavigationGuard } from 'vue-router';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw {
  path: string; // 路径
  name?: string | symbol; // 名字
  meta?: RouteMeta; // 路由元信息
  redirect?: string; // 重定向地址
  component: Component | string; // 组件
  children?: AppRouteRecordRaw[]; // 子路由
  alias?: string | string[]; // 别名
  props?: Record<string, any>; // 传递给路由的参数
  beforeEnter?: NavigationGuard | NavigationGuard[]; // 路由独享的守卫
  fullPath?: string; // 完整路径
}
