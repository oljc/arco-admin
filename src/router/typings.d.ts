import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面角色权限 */
    roles?: string[];
    /** 是否需要登录 */
    requiresAuth?: boolean;
    /** 菜单图标 */
    icon?: string;
    /** 国际化 */
    locale?: string;
    /** 隐藏菜单 */
    hideInMenu?: boolean;
    /** 隐藏子菜单 */
    hideChildrenMenu?: boolean;
    /** 高亮菜单名字 */
    activeMenu?: string;
    /** 排序 */
    order?: number;
    /** 是否出现在 tabBar 标签栏 */
    noAffix?: boolean;
    /** 是否忽略缓存 */
    ignoreCache?: boolean;
  }
}
