<template>
  <div class="container">
    <header class="header">
      <LogoSvg style="width: 36px; color: #165fdd" />
      <div class="header-text">Arco Admin</div>
    </header>
    <div class="content">
      <LoginForm />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './components/login-form.vue';
import LogoSvg from '@/assets/logo.svg';
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;
  background-image: url('../../assets/images/background.png');
  background-repeat: no-repeat;
  background-size: cover;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }

  .header {
    position: fixed;
    top: 0;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    width: 100%;
    padding: @spacing-7 @spacing-0;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      font-size: 26px;
      font-weight: 500;
      color: rgb(var(--color-text-1));
    }
  }
}

@media (max-height: @screen-md) {
  .footer {
    display: none;
  }
}
</style>
