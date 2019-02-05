<template>
  <v-app>
    <header-component></header-component>
    <v-content>
      <v-container fluid fill-height>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </v-content>
  </v-app>
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
