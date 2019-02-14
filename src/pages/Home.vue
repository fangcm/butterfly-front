<template>
  <v-app id="inspire">
    <header-component></header-component>
    <v-content>
      <v-container fluid fill-height pa-1 ma-0>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import headerComponent from './common/Header.vue';

  export default {
    name: 'home',
    components: {
      headerComponent
    }
  }
</script>
