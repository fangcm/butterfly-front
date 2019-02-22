<template>
  <v-app id="inspire">
    <header-component></header-component>
    <v-content>
      <router-view></router-view>
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
