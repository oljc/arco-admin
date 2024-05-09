<template>
  <footer class="footer">
    <slot>
      Arco Admin 版权所有 © 2023 李江辰｜
      <a-link
        style="font-size: 12px"
        href="https://github.com/oljc/arco-admin/blob/main/LICENSE"
        target="_blank"
      >
        MIT 使用条款
      </a-link>
    </slot>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: @size-mini;
  color: var(--color-text-2);
  text-align: center;
}
</style>
