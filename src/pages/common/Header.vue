<template>
  <div>
    <v-toolbar dense fixed clipped-left app dark color="primary">
      <v-btn icon @click="routerBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn icon @click="toPage('/app/index')">
        <v-icon>home</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ breadcrumbs }}
      </v-toolbar-title>
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
      },
      routerBack() {
        /*        if(this.$store.state.sessionToken){
                  if(this.$store.state.isFirst){
                    this.setIsFirst(false);
                    this.$router.go(-1);
                    this.$router.go(-1);
                  }else{
                    this.$router.go(-1)
                  }
                }else{
                  this.$router.go(-1)
                }*/
        this.$router.go(-1)
      }
    },
    components: {},
    computed: {
      ...mapGetters([
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
