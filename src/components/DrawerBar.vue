<template>
  <div>
    <mu-drawer :open="open" :docked="false" @close="toggle()">
      <mu-appbar title="菜单"></mu-appbar>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item>
        <mu-list-item-title>关闭</mu-list-item-title>
        <mu-divider/>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      open: false
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>
