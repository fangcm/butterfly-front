<template>
  <div>
    <div class="fixed-bar">
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="user">用户</mu-tab>
        <mu-tab value="role">角色</mu-tab>
        <mu-tab value="menu">菜单</mu-tab>
      </mu-tabs>
    </div>
    <div class="default-view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// import {getUserInfo} from '../../api/user'

export default {
  data () {
    return {
      activeTab: 'user'
    }
  },
  created () {
    var tmpArr = this.$route.path.split('/')
    if (tmpArr[1] === 'admin') {
      this.handleTabChange(tmpArr[2])
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
      this.$router.push({path: '/admin/' + val})
    }
  }
}
</script>
