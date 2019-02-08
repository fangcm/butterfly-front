<template>
  <v-layout align-center>
    <v-flex xs12 sm12 md12>
      <template v-for="menu in menuList">
        <v-subheader>{{menu.name}}</v-subheader>
        <v-divider></v-divider>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="child in menu.children" :key="child.id" xs4>
              <v-btn flat :color="child.color" :to="child.path">
                <v-icon>{{child.icon}}</v-icon>
                <span>{{child.name}}</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-flex>
  </v-layout>
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
