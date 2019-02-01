<template>
  <div>
    <mu-drawer :open="open" :docked="false" @close="toggle()">
      <mu-appbar title="菜单" color="secondary" :z-depth="2"></mu-appbar>
      <mu-list toggle-nested>
        <!-- 动态菜单 -->
        <mu-list-item button :ripple="false" nested :open="menuDownOpen === key"
                      @toggle-nested="menuDownOpen = arguments[0] ? key : ''"
                      v-if="isLogin" v-for="(menu,key) in menuList" :key="menu.id">
          <mu-list-item-action>
            <mu-icon :value="menu.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{menu.name}}</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested"
                        v-for="child in menu.children" :key="child.id"
                        @click="toPage(child.path)">
            <mu-list-item-action>
              <mu-icon slot="left" :value="child.icon"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{child.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
        <!-- 固定菜单 -->
        <mu-list-item button v-if="!isLogin" @click="toPage('/login')">
          <mu-list-item-action>
            <mu-icon slot="left" value="perm_identity"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>登录</mu-list-item-title>
        </mu-list-item>
        <mu-divider v-if="isLogin"/>
        <mu-list-item button v-if="isLogin" @click="logout()">
          <mu-list-item-action>
            <mu-icon slot="left" value="exit_to_app"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>退出登录</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import dataMenu from '@/api/data-menu'

  export default {
    data: function () {
      return {
        open: false,
        menuDownOpen: '',
        menuList: dataMenu
      }
    },
    created() {
      if (!this.userToken) {
        this.$router.push({path: '/login'})
      }
    },
    methods: {
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
      },
      ...mapActions(['loginOut'])
    },
    computed: {
      isLogin() {
        return !(this.userToken === null || this.userToken === undefined || this.userToken === '')
      },
      ...mapGetters(['userToken'])
    }

  }
</script>
