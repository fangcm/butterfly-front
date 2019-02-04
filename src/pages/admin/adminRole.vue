<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-list two-line>
        <template v-for="item in list">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>accessibility</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{item.name}}
              </v-list-tile-title>
              <v-list-tile-sub-title v-if="item.roleCode">
                代码 &mdash; {{ item.roleCode }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-btn icon small>
              <v-icon color="pink">edit</v-icon>
            </v-btn>
            <v-btn icon small>
              <v-icon color="pink">delete</v-icon>
            </v-btn>
            <v-btn icon small>
              <v-icon color="grey lighten-1">flag</v-icon>
            </v-btn>
          </v-list-tile>
          <v-divider/>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import {adminRoleList} from '@/api/core-api'


  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {},
    created() {
      let _data = {};
      adminRoleList(_data).then((data) => {
        // 保存登录状态和信息
        this.list = data.data.content;
      });
    }
  }
</script>
