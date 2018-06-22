<template>
  <div>
    <my-header :title="title" @toggleDrawerBar="toggleDrawerBar"></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-footer></my-footer>
    <!-- 侧边栏 -->
    <drawer-bar ref="DrawerBar"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import DrawerBar from '@/components/DrawerBar'
import MyHeader from '@/components/Header'
import MyFooter from '@/components/Footer'

export default {
  data () {
    return {
      title: '是否打开侧边栏',
      logining: true
    }
  },
  created () {
    if (!this.token) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    // 打开关闭侧边栏
    toggleDrawerBar () {
      this.$refs.DrawerBar.toggle()
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  components: {
    DrawerBar,
    MyHeader,
    MyFooter
  }
}
</script>

<style scoped>
</style>
