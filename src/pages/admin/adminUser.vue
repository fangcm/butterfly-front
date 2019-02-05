<template>
  <v-container fluid grid-list-xl>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>print</v-icon>
      </v-btn>

      <v-btn icon @click=add_good>
        <v-icon>add</v-icon>
      </v-btn>

    </v-toolbar>

    <v-layout column>

      <v-flex v-for="item in list" :key="item.id">
        <v-card color="white" flat>
          <v-card-title>
            <v-icon left> edit</v-icon>
            <span class="title blue-grey--text text--darken-3">手机:{{item.mobile}}</span>
            <span class="title red--text text--darken-3" v-if="item.status===1">(禁用)</span>
          </v-card-title>
          <v-card-text class="font-weight-light">
            <span class="title blue-grey--text text--darken-3" v-if="item.nickName">昵称:{{item.nickName}}</span>
            {{item.email}},
            {{item.remarks}},

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="blue-grey darken-3" title="编辑">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="blue-grey darken-3" title="删除">delete</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="blue-grey darken-3" title="增加">add</v-icon>
            </v-btn>
            <v-btn icon v-if="item.status===0">
              <v-icon color="blue-grey darken-3" title="禁用">report</v-icon>
            </v-btn>
            <v-btn icon v-if="item.status===1">
              <v-icon color="blue-grey darken-3" title="启用">flag</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
  import {adminUserList} from '@/api/core-api'

  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {},
    created() {
      let _data = {};
      adminUserList(_data).then((data) => {
        // 保存登录状态和信息
        this.list = data.data.content;
      });
    }
  }
</script>
