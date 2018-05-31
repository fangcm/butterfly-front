<template>
  <div class="main-page">
    <x-header>the page title.</x-header>

    <x-button type="primary" @click.native="showCamera"><i class="iconfont icon-video"></i>&nbsp;拍照</x-button>
    <x-button type="primary" plain @click.native="$vux.toast.text('How are you~', 'bottom')">Toast示例</x-button>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <ul>
      <li v-for="(item, index) in items">.. {{item.name}}<br>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      bridge: window.WebViewJavascriptBridge,
      items: []
    }
  },
  methods: {
    showCamera () {
      let self = this
      /*
      window.WebViewJavascriptBridge.callHandler('cameraPic', null, (response) => {
        self.msg = response
      })
      */
      var cmr = window.plus.camera.getCamera()

      cmr.captureImage(function (p) {
        window.plus.io.resolveLocalFileSystemURL(p, function (entry) {
          self.createItem(entry)
        }, function (e) { })
      }, function (e) { }, {filename: '_doc/camera/', index: 1})
    },
    createItem (entry) {
      this.items.push(entry)
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
