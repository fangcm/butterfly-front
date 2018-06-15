<template>
  <div class="v-setting">
    <x-header :right-options="{showMore: false}"
              @on-click-more="showMenus = true" @on-click-title="scrollTop" class="v-hd">我的设置
    </x-header>

    <group>
      <cell title="昵称" is-link :value="userName" link="/setting/changeName"></cell>
      <cell title="更换手机" is-link :value="userPhone" link="/setting/changePhone"></cell>
      <cell title="更换密码" is-link link="/setting/changePassword"></cell>
    </group>
    <group title="作者及软件简介">
      <h3>黑狼</h3>
      <p class="mt-20">本人热衷于计算机编程，也喜欢看小说、骑自行车等。请关注我的博客：
        <span class="c-fc3">http://blog.sina.com.cn/fangcm</span>
      </p>
    </group>
    <group title="退出本系统登录状态">
      <x-button type="primary" @click.native="logout">退出登录</x-button>
    </group>
  </div>
</template>

<script>
  // 引入组件
  import {XHeader, Cell, Group, XButton} from 'vux'
  // 创造构造器
  export default {
    components: {
      XHeader, Cell, Group, XButton
    },
    data () {
      return {
        show: false,
        demo2: '美食',
        list2: ['精选', '美食', '电影', '酒店', '外卖'],
        show1: false
      }
    }
  }
</script>
