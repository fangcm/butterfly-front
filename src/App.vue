<template>
  <div id="app">
    <v-loading v-show="loading"></v-loading>
    <keep-alive include='register'>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import VLoading from '@/components/Loading'
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      VLoading
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    }
  }
</script>
