<template>
  <div>
    <mu-drawer :open="open" :docked="false" @close="toggle()">
      <mu-appbar title="菜单" color="secondary" :z-depth="2"></mu-appbar>
      <mu-list toggle-nested>

        <mu-list-item button @click="toPage('/login')">
          <mu-list-item-action>
            <mu-icon slot="left" value="settings"></mu-icon>
          </mu-list-item-action>
          设置
        </mu-list-item>
        <mu-divider/>
        <mu-list-item button v-if="isLogin" @click="logout()">
          <mu-list-item-action>
            <mu-icon slot="left" value="exit_to_app"></mu-icon>
          </mu-list-item-action>
          退出登录
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
    created() {
      if (!this.userToken) {
        this.$router.push({path: '/login'})
      }
    },
    methods: {
      ...mapActions([
        'loginOut'
      ]),
      toggle() {
        this.open = !this.open
      },
      toPage(path) {
        this.$router.push(path)
        this.toggle()
      },
      logout() {
        this.loginOut();
        this.$router.push({path: '/login'})
        this.toggle()
      }
    },
    computed: {
      ...mapGetters([
        'userToken'
      ]),
      isLogin() {
        return !(this.userToken === null || this.userToken === undefined || this.userToken === '')
      }

    }

  }
</script>
