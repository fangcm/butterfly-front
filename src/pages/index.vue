<template>
  <div>
    <mu-flex direction="column" v-for="menu in menuList" :key="menu.id">
      <mu-divider></mu-divider>
      <mu-sub-header>{{menu.name}}</mu-sub-header>
      <mu-flex class="flex-wrapper" align-items="center" wrap="wrap">
        <mu-flex class="flex-child" justify-content="center" v-for="child in menu.children" :key="child.id">
          <router-link class="item" :to="child.path">
            <mu-icon class="icon" :value="child.icon"></mu-icon>
            <span class="icon-desc">{{child.name}}</span>
          </router-link>
        </mu-flex>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
  import {userMenu} from '@/api/core-api'

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
    }
  }
</script>

<style scoped>
  .flex-wrapper {
    margin-left: 20px;
    padding: 5px 5px;
  }

  .flex-child {
    width: 60px;
    text-align: center;
  }

  .item {
    display: block;
    width: 100%;
    height: auto;
  }

  .item .icon {
    display: block;
    color: orange;
  }

  .item .icon-desc {
    text-align: center;
    font-size: 12px;
    color: #666;
  }
</style>
