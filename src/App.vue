<template>
  <div id="app">
    <router-view name="header"/>
    <router-view name="body"/>
    <router-view name="footer"/>
    <mu-snackbar position="top" :color="popupContent.type" :open.sync="popupVisible">
      {{popupContent.msg}}
      <mu-button flat slot="action" color="white" @click="hidePopup">¹Ø±Õ</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['popupVisible', 'popupContent'])
  },
  methods: {
    ...mapActions(['hidePopup'])
  }
}
</script>
