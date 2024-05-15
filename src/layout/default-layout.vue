<template>
  <a-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <NavBar class="layout-navbar" />
    <a-layout-sider
      v-if="renderMenu"
      v-show="!hideMenu"
      class="layout-sider"
      breakpoint="xl"
      :collapsed="collapsed"
      :collapsible="true"
      :width="menuWidth"
      :hide-trigger="true"
      @collapse="setCollapsed"
    >
      <Menu />
    </a-layout-sider>
    <a-layout class="layout-content" :style="paddingStyle">
      <TabBar v-if="appStore.tabBar" />
      <a-layout-content>
        <PageLayout />
      </a-layout-content>
      <Footer v-if="footer" />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch, provide, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppStore, useUserStore } from '@/store';
import usePermission from '@/hooks/usePermission';
import useResponsive from '@/hooks/useResponsive';
import PageLayout from './page-layout.vue';

const isInit = ref(false);
const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const permission = usePermission();
useResponsive(true);
const renderMenu = computed(() => appStore.menu && !appStore.topMenu);
const hideMenu = computed(() => appStore.hideMenu);
const footer = computed(() => appStore.footer);
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});
const collapsed = computed(() => {
  return appStore.menuCollapse;
});

const paddingLeft = computed(() => {
  return renderMenu.value && !hideMenu.value ? menuWidth.value : 0;
});
const paddingStyle = computed(() => {
  return { paddingLeft: `${paddingLeft.value}px` };
});
const setCollapsed = (val: boolean) => {
  if (!isInit.value) return;
  appStore.updateSettings({ menuCollapse: val });
};
watch(
  () => userStore.role,
  roleValue => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: 'notFound' });
  }
);
const drawerVisible = ref(false);
provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value;
});
onMounted(() => {
  isInit.value = true;
});
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;

  &-navbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }

  &-content {
    position: relative;
    min-height: 100vh;
    padding-top: @nav-size-height;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }

  &-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    padding-top: @nav-size-height;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      content: '';
      background-color: var(--color-border);
    }

    > :deep(.arco-layout-sider-children) {
      height: 100%;
      overflow: auto;
      overflow-x: hidden;
    }

    :deep(.arco-menu) {
      height: 100%;

      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--color-text-4);
        background-clip: padding-box;
        border: 4px solid transparent;
        border-radius: 7px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }
}
</style>
