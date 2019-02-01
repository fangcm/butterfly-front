<template>
  <div id="header">
    <mu-appbar>
      <mu-button icon slot="left" @click="clickMenu">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{title}}
    </mu-appbar>
    <!-- 侧边栏 -->
    <menu-component ref="menuComponent"></menu-component>
  </div>
</template>

<script>
  import menuComponent from './menu.vue';

  export default {
    props: {
      title: String
    },
    methods: {
      clickMenu() {
        this.$refs.menuComponent.toggle()
      }
    },
    components: {
      menuComponent
    }
  }
</script>
