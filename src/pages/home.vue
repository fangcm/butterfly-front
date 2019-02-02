<template>
  <div>
    <header-component></header-component>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
  }
</script>
