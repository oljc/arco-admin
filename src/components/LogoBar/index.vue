<template>
  <div class="logo-bar">
    <LogoSvg class="logo-bar-logo" />
    <transition name="fade">
      <a-typography-title v-if="!hideName" class="logo-bar-name" :heading="5">
        Arco Admin
      </a-typography-title>
    </transition>
    <a-tag color="orange" style="margin-left: 6px">
      <template #icon>
        <icon-tag />
      </template>
      0.2.3
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import LogoSvg from '@/assets/logo.svg';

defineProps({
  hideName: Boolean
});
</script>

<style scoped lang="less">
.logo-bar {
  display: flex;
  align-items: center;

  &-logo {
    width: 36px;
    color: rgb(var(--primary-6));
  }

  &-name {
    margin: 0;
    margin-left: 6px;
    font-size: 18px;
    white-space: nowrap;
  }
}

.fade-enter-active {
  transition: opacity ease-in-out 0.3s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
