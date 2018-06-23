<template>
  <div id="header">
    <mu-appbar>
      <mu-button icon slot="left" @click="clickMenu">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{title}}
    </mu-appbar>
    <!-- 侧边栏 -->
    <drawer-bar ref="drawerBar"/>
  </div>
</template>

<script>
import DrawerBar from '@/components/DrawerBar'

export default {
  props: {
    title: String
  },
  methods: {
    clickMenu () {
      this.$refs.drawerBar.toggle()
    }
  },
  components: {
    DrawerBar
  }
}
</script>
