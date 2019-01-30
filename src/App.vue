<template>
  <div id="app">
    <router-view name="header"/>
    <router-view name="body"/>
    <router-view name="footer"/>
    <mu-snackbar position="top" :color="showPopupContent.type" :open.sync="showPopupVisible">
      {{showPopupContent.msg}}
      <mu-button flat slot="action" color="white" @click="hidePopup">关闭</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapGetters(['showPopupVisible', 'showPopupContent'])
    },
    methods: {
      ...mapActions(['hidePopup'])
    }
  }
</script>
