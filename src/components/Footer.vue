<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="favorites" title="Home" icon="home" href="#/"/>
      <mu-bottom-nav-item value="recents" title="List" icon="list" href="#/list"/>
      <mu-bottom-nav-item value="nearby" title="Settings" icon="settings" href="#/setting"/>
    </mu-bottom-nav>
  </mu-paper>
</template>
<script>
export default {
  data () {
    return {
      bottomNav: 'favorites'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>
<style scoped>
  .mu-bottom-nav {
    padding-bottom: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
