<template>
  <div v-if="show">
    <x-table :cell-bordered="false" style="margin-top:7px">
      <thead>
      <tr>
        <th>联系人</th>
        <th>联系电话</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>赵金祥</td>
        <td>18660069601</td>
      </tr>
      <tr>
        <td>张秣</td>
        <td>15215355660</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import { XTable } from 'vux'
  export default {
    components: {
      XTable
    },
    created () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      setTimeout(() => {
        this.show = true
        this.$vux.loading.hide()
      }, 1500)
    },
    data () {
      return {
        show: true
      }
    }
  }
</script>

<style scoped>
</style>

