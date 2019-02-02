<template>
  <div id="header">
    <mu-appbar>
      <mu-button icon slot="left" @click="clickMenu">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{title}}
      <mu-button flat slot="right" @click="clickHome">
        <mu-icon value="home"></mu-icon>
      </mu-button>
    </mu-appbar>
    <!-- 侧边栏 -->
    <menu-component ref="menuComponent"></menu-component>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import menuComponent from './menu.vue';

  export default {
    methods: {
      clickMenu() {
        this.$refs.menuComponent.toggle()
      },
      clickHome() {
        this.$router.push({path: '/home/index'});
      }
    },
    components: {
      menuComponent
    },
    computed: {
      ...mapGetters([
        'title'
      ])
    }
  }
</script>
