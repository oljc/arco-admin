<template>
  <div class="navbar">
    <LogoBar class="left-side" />
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-input-search style="width: 135px" placeholder="搜索" />
      </li>
      <li>
        <a-tooltip content="重新加载">
          <div class="nav-btn" @click="handleReload">
            <icon-sync />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="源码地址">
          <a
            class="nav-btn"
            href="https://github.com/oljc/arco-admin"
            target="_blank"
          >
            <icon-github />
          </a>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="语言">
          <div class="nav-btn" @click="setDropDownVisible">
            <icon-language />
          </div>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-tooltip
          :content="
            theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
          "
        >
          <div class="nav-btn" @click="handleToggleTheme()">
            <icon-moon-fill v-if="theme === 'dark'" />
            <icon-sun-fill v-else />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="消息通知">
          <a-badge :count="9">
            <div class="nav-btn" @click="setPopoverVisible">
              <icon-notification />
            </div>
          </a-badge>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
          <div class="nav-btn" @click="toggleFullScreen">
            <icon-fullscreen-exit v-if="isFullscreen" />
            <icon-fullscreen v-else />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="应用配置">
          <div class="nav-btn" @click="setVisible">
            <icon-settings />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar style="margin-right: 8px; cursor: pointer" :size="32">
            <IconUser />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>切换角色</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'Info' })">
                <icon-user />
                <span>用户中心</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'Setting' })">
                <icon-settings />
                <span>用户设置</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>退出登录</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useFullscreen } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import useLocale from '@/hooks/useLocale';
import useUser from '@/hooks/useUser';
import useThemes from '@/hooks/useThemes';

const appStore = useAppStore();
const userStore = useUserStore();
const { logout } = useUser();
const { changeLocale, currentLocale } = useLocale();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const locales = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
];
const theme = computed(() => {
  return appStore.theme;
});
const topMenu = computed(() => appStore.topMenu && appStore.menu);

const { toggleTheme: handleToggleTheme } = useThemes();

const setVisible = () => {
  appStore.updateSettings({ globalSettings: true });
};
const handleReload = () => {
  window.location.reload();
};
const refBtn = ref();
const triggerBtn = ref();
const setPopoverVisible = () => {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  refBtn.value.dispatchEvent(event);
};
const handleLogout = () => {
  logout();
};
const setDropDownVisible = () => {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  triggerBtn.value.dispatchEvent(event);
};
const switchRoles = async () => {
  const res = await userStore.switchRoles();
  Message.success(res as string);
};
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 4px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    // transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5715;
    color: rgb(var(--gray-8));
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    border-radius: var(--border-radius-circle);
    outline: none;

    &:hover {
      border: 1px solid rgb(var(--gray-2));
    }
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
