<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <!-- 页面头部 -->
    <x-header slot="header" class="page-header" :left-options="{showBack: false}">
      <span>overwrite-left</span>
    </x-header>
    <!-- 页面内容 -->
    <router-view :class="transitionName"></router-view>
    <!-- 底部导航 -->
    <tabbar slot="bottom">
      <tabbar-item :selected="$route.name=='home'" link="/main">
        <i class="iconfont icon-message" slot="icon"></i>
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name=='demo'" link="/demo">
        <i class="iconfont icon-time" slot="icon"></i>
        <span slot="label">示例</span>
      </tabbar-item>
      <tabbar-item link="/hello">
        <i class="iconfont icon-error" slot="icon"></i>
        <span slot="label">示例2</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        transitionName: ''
      }
    },
    watch: {
      '$route' (to, from) {
        this.transitionName = 'animated ' + (to.meta.index >= from.meta.index ? 'slideInRight' : 'slideInLeft')
      }
    }
  }
</script>
<style lang="less">
  .page-header.vux-header {
    width:100%;
    position:absolute;
    z-index:100;
  }
</style>
