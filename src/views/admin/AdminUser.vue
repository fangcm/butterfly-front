<template>
  <div class="user">
    <mu-list textline="three-line">
      <mu-list-item v-for="user in userList" :key="user.id">
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="info"></mu-icon>
          </mu-button>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{user.mobile}} - {{user.nickName}}</mu-list-item-title>
          <mu-list-item-sub-title>
            {{user.email}}<br/>{{user.remarks}}
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
  </div>
</template>

<script>
import dataUser from '@/api/data-user'

export default {
  data () {
    return {
      userList: dataUser
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
</style>
