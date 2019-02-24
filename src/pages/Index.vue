<template>
  <v-layout fluid pa-1 ma-0>
    <v-flex xs12 sm12 md12>
      <template v-for="menu in menuList">
        <v-subheader>{{menu.name}}</v-subheader>
        <v-divider></v-divider>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs3 v-for="child in menu.children" :key="child.id">
              <icon-button :color="child.color" :to="child.path" :icon="child.icon" :label="child.name"/>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
  import {userMenu} from '@/api/core-api'
  import IconButton from '@/components/IconButton'

  export default {
    name: "index",
    data() {
      return {
        menuList: []
      }
    },
    components: {IconButton},
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
