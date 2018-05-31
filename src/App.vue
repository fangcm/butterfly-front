<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      ws: null,
      transitionName: 'animated fadeIn'
    }
  },
  watch: {
    '$route' (to, from) {
      this.transitionName = 'animated ' + (to.meta.index >= from.meta.index ? 'slideInRight' : 'slideInLeft')
    }
  },
  created () {
    if (window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
  },
  methods: {
    plusReady () {
      let self = this
      window.plus.key.addEventListener('backbutton', function () {
        self.goBack() && window.confirm('确认退出？') && window.plus.runtime.quit()
      }, false)
    },
    /* 返回，若已在首页，则返回true，提示用户是否退出系统 */
    goBack () {
      if (this.$route.path !== '/') {
        this.$router.go(-1)
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/variables.less';
@import './style/common.less';
html, body, #app {
  height: 100%;
}
body {
  background-color: @bg-color;
  height: 100%;
}
</style>
