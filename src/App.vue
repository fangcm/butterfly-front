<template>
  <div id="app">
    <router-view></router-view>
    <mu-dialog title="信息" width="400" max-width="80%" :open.sync="popupVisible">
      {{popupContent}}
      <mu-button slot="actions" flat color="primary" @click="closePopupDialog()">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['popupVisible', 'popupContent'])
  },
  methods: {
    closePopupDialog () {
      this.popupVisible = false
    }
  }
}
</script>
