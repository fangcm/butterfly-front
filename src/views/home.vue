<template>
  <div>
    <my-header></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-footer></my-footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MyHeader from '@/components/header/header'
import MyFooter from '@/components/footer/footer'

export default {
  data () {
    return {
      mobile: '',
      password: '',
      logining: true
    }
  },
  created () {
    if (!this.token) {
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style scoped>
</style>
