<template>
  <div class="user" v-if="userInfo.mobile">
    <div class="userinfo-wrapper">
      <div class="avatar">
        <img v-lazy="avatarImg" width="100%">
      </div>
      <div class="info">
        <span class="text">{{userInfo.nickName}}</span>
        <span class="text">{{userInfo.email}}</span>
        <span class="text">{{userInfo.mobile}}</span>
      </div>
      <i class="icon icon-left" @click="$router.go(-1)"></i>
    </div>
    <div class="menu-wrapper">
      <ul class="menus">
        <li class="menu-item">
          <i class="icon icon-user1"></i>
          <span class="text">我的资料</span>
          <i class="icon icon-right"></i>
        </li>
        <li class="menu-item">
          <i class="icon icon-collect"></i>
          <span class="text">我的收藏</span>
          <i class="icon icon-right"></i>
          <span class="text count" v-if="userInfo.collects.length">{{userInfo.collects.length}}</span>
        </li>
      </ul>
    </div>
    <div class="btn-wrapper">
      <button @click="logout">退出</button>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from '../../api/user'
import {mapMutations} from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getInfo()
    })
  },
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    avatarImg () {
      if (this.userInfo.headImg) {
        return this.userInfo.headImg
      }
      return false
    }
  },
  methods: {
    _getInfo () {
      const {userInfo} = this.$store.getters
      if (userInfo.mobile) {
        this.userInfo = userInfo
        return
      }
      getUserInfo().then(res => {
        console.log(res.status)
        if (res.success) {
          this.setUserInfo(res.data.user)
          this.userInfo = res.data.user
        } else {
          this.$router.replace('/login')
        }
      })
    },
    logout () {
      this.setUserInfo({})
      this.$router.push({name: '/login'})
    },
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO'
    })
  }
}
</script>

<style scoped>
</style>
