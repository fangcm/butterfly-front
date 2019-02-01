<template>
  <div>
    <header-component></header-component>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import headerComponent from './common/header.vue';
  import footerComponent from './common/footer.vue';

  export default {
    name: 'home',
    data() {
      return {}
    },
    components: {
      headerComponent, footerComponent
    },
  }
</script>
