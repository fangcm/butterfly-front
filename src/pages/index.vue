<template>
  <div class="channel">
    <ul class="channelList">
      <li class="channelListItem" v-for="menu in menuList" :key="menu.id" @click="toChannelList(item, true)">
        <img :src="menu.icon" width="100%"/>
        <span class="title">{{menu.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {userMenu} from '@/api/user-api'
  import {mapActions} from 'vuex'

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

  .channelList {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 56px;
  }

  .channelList .channelListItem {
    display: inline-block;
    padding: 20px;
    width: 25%;
    text-align: center;
  }

  .channelList .channelListItem img {
    width: 100%;
    max-width: 50px;
  }

  .channelList .channelListItem span {
    display: block;
    color: #333;
  }
</style>
