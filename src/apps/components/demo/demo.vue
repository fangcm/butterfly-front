<template>
  <div>
    <div class="container">
      demo1
      <br>
      <check-icon :value.sync="demo1"> Do you agree? ({{ demo1 }})</check-icon>
      <br>
      demo2
      <br>
      <check-icon :value.sync="demo2" type="plain">Do you agree?
      ({{ demo2 }})</check-icon>
      <x-button type="warn" @click.native="logout">退出</x-button>
      
    </div>
  </div>
</template>
<style lang="less" scoped>
  .container {
    padding: 10px;
  }
</style>
<script>

export default {
  data () {
    return {
      demo1: false,
      demo2: true
    }
  },
  methods: {
    /* 登出 */
    logout () {
      this.$store.commit('setToken', '')
      this.$router.push('/')
    }
  }
}
</script>