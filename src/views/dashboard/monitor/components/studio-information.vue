<template>
  <a-card class="general-card" title="直播信息">
    <a-form :model="{}" layout="vertical">
      <a-form-item label="直播标题" required>
        <a-input placeholder="Admin 的直播间" />
      </a-form-item>
      <a-form-item label="上线通知" required>
        <a-textarea />
      </a-form-item>
      <a-form-item label="直播类目" required>
        <a-input-search />
      </a-form-item>
    </a-form>
    <a-button type="primary">更新</a-button>
  </a-card>
</template>

<script lang="ts" setup></script>
