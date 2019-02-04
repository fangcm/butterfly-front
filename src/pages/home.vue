<template>
  <div>
    <header-component></header-component>
    <v-content>
      <v-breadcrumbs>
        <v-icon slot="divider">forward</v-icon>
        <v-breadcrumbs-item>
          <router-link to="/home/index" exact>首页</router-link>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item v-if="breadcrumbs">{{ breadcrumbs }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  import headerComponent from './common/header.vue';

  export default {
    name: 'home',
    data() {
      return {}
    },
    components: {
      headerComponent
    },
    methods: {},
    computed: {
      breadcrumbs() {
        return this.$route.meta.title;
      }
    }
  }
</script>
