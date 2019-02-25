<template>
  <div>
    <v-toolbar dense fixed clipped-left app dark color="primary">
      <v-btn icon @click="onBackClicked()" v-if="showBackButton">
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
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    created() {
      if (!this.userToken) {
        this.$router.push({path: '/login'})
      }
    },
    methods: {
      toPage(path) {
        this.$router.push(path)
      },
      onBackClicked() {
        this.$router.go(-1)
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'userToken'
      ]),
      showBackButton() {
        if (this.userToken === null || this.userToken === undefined || this.userToken === '') {
          return false;
        }
        return this.$route.name !== 'index';
      },
      breadcrumbs() {
        return this.$route.meta.title
      }
    }
  }
</script>
