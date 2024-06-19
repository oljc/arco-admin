<template>
  <div v-if="!appStore.navbar" class="fixed-settings" @click="setVisible">
    <a-button type="primary">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </div>
  <a-drawer
    :width="410"
    unmount-on-close
    :visible="visible"
    @ok="copySettings"
    @cancel="cancel"
  >
    <template #title>应用配置</template>
    <a-alert type="warning">
      配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置"
      按钮，将配置替换到 settings.json 中即可。
    </a-alert>
    <Block :options="contentOpts" title="内容区域" />
    <Block :options="othersOpts" title="其他设置" />
    <a-color-picker v-model="color" @change="handleColorChange" />
    <template #footer>
      <a-button type="primary" style="margin: 0" shape="round" long>
        复制配置
      </a-button>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useClipboard } from '@vueuse/core';
import { useAppStore } from '@/store';
import Block from './block.vue';
import useColorTheme from '@/hooks/useColorTheme';

const emit = defineEmits(['cancel']);

const appStore = useAppStore();
const { copy } = useClipboard();
const visible = computed(() => appStore.globalSettings);
const contentOpts = computed(() => [
  { name: 'settings.navbar', key: 'navbar', defaultVal: appStore.navbar },
  {
    name: 'settings.menu',
    key: 'menu',
    defaultVal: appStore.menu
  },
  {
    name: 'settings.topMenu',
    key: 'topMenu',
    defaultVal: appStore.topMenu
  },
  { name: 'settings.footer', key: 'footer', defaultVal: appStore.footer },
  { name: 'settings.tabBar', key: 'tabBar', defaultVal: appStore.tabBar },
  {
    name: 'settings.menuWidth',
    key: 'menuWidth',
    defaultVal: appStore.menuWidth,
    type: 'number'
  }
]);
const othersOpts = computed(() => [
  {
    name: 'settings.colorWeak',
    key: 'colorWeak',
    defaultVal: appStore.colorWeak
  }
]);

const cancel = () => {
  appStore.updateSettings({ globalSettings: false });
  emit('cancel');
};
const copySettings = async () => {
  const text = JSON.stringify(appStore.$state, null, 2);
  await copy(text);
  Message.success('已拷贝配置');
};
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true });
};

const color = ref(appStore.themeColor);
const { updateThemeColor } = useColorTheme();
const handleColorChange = color => {
  updateThemeColor(color);
};
</script>

<style scoped lang="less">
.fixed-settings {
  position: fixed;
  top: 280px;
  right: 0;

  svg {
    font-size: 18px;
    vertical-align: -4px;
  }

  .arco-drawer-footer > .arco-btn {
    margin-left: 0;
  }
}
</style>
