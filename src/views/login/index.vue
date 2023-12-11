<template>
  <div class="container">
    <div class="logo">
      <img alt="logo" src="../../assets//logo.svg" style="width: 36px" />
      <div class="logo-text">Arco Admin</div>
    </div>
    <div class="content">
      <LoginForm />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

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
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      font-size: 20px;
      color: var(--color-fill-1);
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
