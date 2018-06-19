<template>
  <div class="user">
    <back-header @back="$router.replace('/user')">
      <img class="image" src="./logo.png" width="70" style="vertical-align: middle">
    </back-header>
    <div class="content">
      <div class="signin-wrapper">
        <section class="form-box">
          <div class="item">
            <i class="icon icon-email"></i>
            <input type="text" placeholder="手机号" v-model="mobile" ref="mobile">
            <img class="image" src="./del.png" v-show="mobile" @click="clear">
          </div>
          <div class="item">
            <i class="icon icon-lock"></i>
            <input type="password" placeholder="密码" v-model="password" ref="password">
          </div>
        </section>
        <div class="btn-wrapper">
          <button @click="check" key="login">登录</button>
        </div>
        <div class="text-wrapper">
          <p class="errmsg" v-show="errMsg">{{errMsg}}</p>
        </div>
      </div>
    </div>
    <confirm ref="confirm" :text="confirmText" confirmBtnText="前往" @confirm="goToLogin"></confirm>
  </div>
</template>

<script>
import BackHeader from '../../components/back-header/back-header'
import Confirm from '../../components/confirm/confirm'
import {userLogin} from '../../api/user'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      mobile: '',
      password: '',
      confirmText: '',
      errMsg: ''
    }
  },
  watch: {
    errMsg () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.errMsg = ''
      }, 1000)
    }
  },
  methods: {
    clear () {
      this.mobile = ''
    },
    goToLogin () {
      this.$router.replace('/login')
    },
    check () {
      if (!this.mobile) {
        this.errMsg = '用户名不能为空'
        return
      }
      if (!this.password || this.password.length < 6) {
        this.errMsg = '密码不能为空且不小于6位'
        return
      }
      this._login()
    },
    _login () {
      userLogin({'username': this.mobile, 'password': this.password}).then(res => {
        if (res.success) {
          this.setUserInfo(res.data.user)
          this.$router.replace({
            name: 'user'
          })
        } else {
          this.errMsg = res.errmsg
        }
      })
    },
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO'
    })
  },
  components: {
    BackHeader,
    Confirm
  }
}
</script>

<style lang="stylus" scoped>
  .user
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 10
    background-color #f6f6f6
    .content
      background-color #f6f6f6
      .signin-wrapper
        .form-box
          background #fff
          .item
            position relative
            display flex
            height 45px
            line-height 45px
            .icon
              margin 0 5px 0 15px
              font-size 25px
              color #777
            input
              flex 1
              position relative
              padding 10px 50px 10px 10px
              outline none
              border none
              font-size 18px
              border-bottom 1px solid #eee
            .image
              position absolute
              top 50%
              transform translateY(-50%)
              right 15px
              width 18px
        .btn-wrapper
          margin 10px
          height 40px
          button
            width 100%
            height 100%
            border-radius 5px
            color #ffffff
            background #1e7dd7
            border none
        .text-wrapper
          overflow hidden
          margin 0 10px
        .errmsg
          float left
          color #f00
</style>
