<template>
  <div id="app">
    <router-view></router-view>
    <mu-snackbar position="top" :color="popupContent.type" :open.sync="popupVisible">
      {{popupContent.msg}}
      <mu-button flat slot="action" color="white" @click="hidePopup">关闭</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['popupVisible', 'popupContent'])
  },
  methods: {
    ...mapActions(['hidePopup'])
  }
}
</script>
