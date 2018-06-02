<template>
  <div>
    <tab :line-width="1">
      <tab-item selected>关于</tab-item>
      <tab-item>我的信息</tab-item>
      <tab-item>修改密码</tab-item>
      <tab-item>修改密码</tab-item>
      <tab-item>修改密码</tab-item>
      <tab-item>修改密码</tab-item>
      <tab-item>修改密码</tab-item>
      <tab-item>修改手机</tab-item>
    </tab>
    <group>
      <cell title="关于" link="about" inline-desc='作者及软件简介'></cell>
    </group>
    <group title="退出本系统登录状态">
      <x-button type="primary" @click.native="logout">退出登录</x-button>
    </group>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Group, Cell, XButton, Tab, TabItem} from 'vux'

  export default {
    name: 'setting',
    components: {
      Tab,
      TabItem,
      Group,
      Cell,
      XButton
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({token: 'getToken'})
    },
    methods: {
      logout () {
        this.$store.commit('setToken', null)
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .box {
    padding: 15px;
  }

  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }

  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }

  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }

  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
</style>
