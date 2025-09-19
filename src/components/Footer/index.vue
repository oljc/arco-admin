<template>
  <footer class="footer">
    <slot>
      Arco Admin 版权所有 © 2025 李江辰｜
      <a-link
        style="font-size: 12px"
        href="https://github.com/oljc/arco-admin/blob/main/LICENSE"
        target="_blank"
      >
        MIT 使用条款
      </a-link>
      ｜
      <a-link style="font-size: 12px" href="https://beian.miit.gov.cn" target="_blank">
        <!-- <img src="@/assets/images/icp.png" alt="" style="width: 14px; height: 14px" /> -->
        闽ICP备2025085819号-2
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
