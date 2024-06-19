<template>
  <a-card class="general-card" title="快捷操作">
    <a-space direction="vertical" fill :size="10">
      <a-button long>
        切换清晰度
        <template #icon>
          <IconTags />
        </template>
      </a-button>
      <a-button long>
        主备流切换
        <template #icon>
          <IconSwap />
        </template>
      </a-button>
      <a-button long>
        摘除清晰度
        <template #icon>
          <IconStop />
        </template>
      </a-button>
      <a-button long>
        推流垫片
        <template #icon>
          <IconArrowRight />
        </template>
      </a-button>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup></script>
