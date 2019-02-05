<template>
  <div>
    <!-- 侧边栏 -->
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0">
        <v-divider></v-divider>
        <v-list-tile @click="toPage('/login')">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>设置</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLogin" @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>退出登录</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense fixed clipped-left app dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{title}}
        <v-icon slot="divider" v-if="breadcrumbs">chevron_right</v-icon>
        {{ breadcrumbs }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toPage('/home/index')">
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        drawer: null
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
      clickMenu() {
        this.$refs.menuComponent.toggle()
      },
      toPage(path) {
        this.$router.push(path)
      },
      logout() {
        this.loginOut();
        this.$router.push({path: '/login'})
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'title',
        'userToken'
      ]),
      isLogin() {
        return !(this.userToken === null || this.userToken === undefined || this.userToken === '')
      },
      breadcrumbs() {
        return this.$route.meta.title
      }
    }
  }
</script>
