<template>
  <div id="header">
    <mu-appbar color="primary">
      <mu-button icon slot="left" @click="toggleDrawerBar">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{topTitle}}
    </mu-appbar>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    toggleDrawerBar () {
      this.$emit('toggleDrawerBar')
    }
  },
  computed: {
    topTitle () {
      return this.title
    }
  }
}
</script>
