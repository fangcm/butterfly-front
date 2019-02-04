<template>
  <div>
    <header-component></header-component>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  import headerComponent from './common/header.vue';

  export default {
    name: 'home',
    components: {
      headerComponent
    }
  }
</script>
