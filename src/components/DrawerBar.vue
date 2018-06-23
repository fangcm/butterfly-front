<template>
  <div>
    <mu-drawer :open="open" :docked="false" @close="toggle()">
      <mu-appbar title="菜单" color="secondary"></mu-appbar>
      <mu-list>
        <mu-list-item button v-if="!isLogin" @click="toPage('/login')">
          <mu-list-item-title>登录</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button v-if="isLogin" @click="toPage('/admin/user')">
          <mu-list-item-title>系统管理</mu-list-item-title>
        </mu-list-item>
        <mu-divider v-if="isLogin"/>
        <mu-list-item button v-if="isLogin" @click="logout()">
          <mu-list-item-title>退出登录</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: function () {
    return {
      open: false
    }
  },
  created () {
    if (!this.token) {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    toPage (path) {
      this.$router.push(path)
      this.toggle()
    },
    logout () {
      this.setToken('')
      this.$router.push({path: '/login'})
      this.toggle()
    },
    ...mapActions(['setToken'])
  },
  computed: {
    isLogin () {
      return !(this.token === null || this.token === undefined || this.token === '')
    },
    ...mapGetters(['token'])
  }

}
</script>
