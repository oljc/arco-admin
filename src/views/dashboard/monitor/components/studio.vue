<template>
  <a-card class="general-card" title="直播预览">
    <template #extra>
      <icon-more />
    </template>
    <div class="studio-wrapper">
      <img
        src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
        class="studio-preview"
      />
      <div class="studio-bar">
        <div v-if="userInfo">
          <a-space :size="12">
            <a-avatar :size="24">
              <img :src="userInfo.avatar" />
            </a-avatar>
            <a-typography-text>{{ userInfo.name }} 直播间</a-typography-text>
          </a-space>
        </div>
        <a-typography-text type="secondary">36,000 在看</a-typography-text>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store';

const userInfo = useUserStore();
</script>

<style scoped lang="less">
.studio {
  &-preview {
    display: block;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  &-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
