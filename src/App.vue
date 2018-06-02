<template>
  <div id="app">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from '@/views/common/footer'

  export default {
    name: 'app',
    components: {
      AppFooter
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './assets/style/variables.less';
  @import './assets/style/common.less';

  html, body, #app {
    height: 100%;
  }

  body {
    background-color: @bg-color;
    height: 100%;
  }
</style>
