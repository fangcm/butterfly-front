<template>
  <div class="lanmuWrapper">
    <mu-flex class="flex-wrapper" align-items="center" v-for="menu in menuList">
      <mu-flex class="flex-wrapper" justify-content="center" fill>
        <mu-sub-header> {{menu.name}}</mu-sub-header>
      </mu-flex>
      <mu-flex class="flex-child" justify-content="center" v-for="child in menu.children" :key="child.id" fill>
        <router-link to="/MeiShi">
          <span class="new-icon-circle iconfont dianying" style="background: #ff6767"></span>
          <span class="icon-desc">{{child.name}}</span>
        </router-link>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
  import {userMenu} from '@/api/user-api'
  import {mapActions} from 'vuex'
  import dataMenu from '@/api/data-menu'

  export default {
    name: "index",
    data() {
      return {
        menuList: []
      }
    },
    components: {},
    created() {
      console.log("enter index page");
      let _data = {};
      userMenu(_data).then((data) => {
        // 保存登录状态和信息
        this.menuList = data.data;
      });
    },
    methods: {
      ...mapActions([
        'setUserInfo',
        'setUserToken'
      ])
    }
  }
</script>

<style scoped>
  .lanmuWrapper {
    background-color: #ffffff;
    border-top: 1px solid #DDD8CE;
    width: 100%;
    height: auto;
    margin-top: 4px;
  }

  .flex-wrapper {
    width: 100%;
    height: auto;
  }

  .flex-child {
    width: 25%;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
  }

  .flex-child:first-child {
    margin-left: 0;
  }

  .flex-wrapper .flex-child > a {
    display: block;
    padding: 10px 0px;
    width: 100%;
    height: auto;
  }

  .flex-wrapper .flex-child .new-icon-circle {
    display: block;
    margin: auto;
    margin-bottom: 7px;
    width: 40px;
    height: 40px;
    border-radius: 500px;
    text-align: center;
    line-height: 40px;
    font-size: 25px;
    color: #fff;
  }

  .flex-wrapper .flex-child .icon-desc {
    text-align: center;
    font-size: 12px;
    color: #666;
  }
</style>
