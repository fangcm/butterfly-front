<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title color="purple lighten-2">食材订购单()</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>print</v-icon>
      </v-btn>
      <v-btn icon to="orders/order">
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-layout column>
      <v-flex v-for="item in list" :key="item.id" pa-0 ma-1>
        <v-card color="white">
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
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0"/>
    </v-layout>
  </v-container>

</template>

<script>
  import {adminUserList} from '@/api/core-api'

  export default {
    data() {
      return {
        page: 1, // 默认载入第一页
        atThisPage: true, // 在使用了keep-alive包裹显示组件的情况下，需要判断当前激活的组件是不是此组件，是的话才加载数据
        list: []
      }
    },
    methods: {
      loadMore: function () {
        if (this.atThisPage) {
          let _data = {};
          adminUserList(_data).then((data) => {
            // 保存登录状态和信息
            this.list.concat(data.data.content);
          });
          this.page++
        }
      },
      filterData: function (startDate, endDate, mealType) {
        if (this.atThisPage) {
          let _data = {};
          adminUserList(_data).then((data) => {
            // 保存登录状态和信息
            this.list = data.data.content;
          });
        }
      }
    },
    created() {
      let _data = {};
      adminUserList(_data).then((data) => {
        // 保存登录状态和信息
        this.list = data.data.content;
      });
    },
    activated() {
      this.atThisPage = true
    },
    deactivated() {
      this.atThisPage = false
    }
  }
</script>
