<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-list two-line>
        <template v-for="item in list">
          <v-subheader> {{item.name}}</v-subheader>
          <template v-for="child in item.children">
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>{{child.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{child.name}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <span style="color: rgba(0, 0, 196, .87)">链接 -</span>{{child.path}}
                  <span style="color: rgba(0, 0, 196, .87)">排序 -</span>{{child.sort}}
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
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import {adminMenuList} from '@/api/core-api'


  export default {
    data() {
      return {
        columns: [
          {title: '级别', name: 'rootLevel', width: 50},
          {title: '名称', name: 'name', width: 150},
          {title: '图标', name: 'icon', width: 150},
          {title: '跳转路径', name: 'path', width: 250},
          {title: '父菜单', name: 'parentId', width: 150},
          {title: '排序', name: 'sort', width: 40},
          {title: '操作', name: '', width: 80, align: 'center'}
        ],
        list: []
      }
    },
    computed: {},
    methods: {},
    created() {
      let _data = {};
      adminMenuList(_data).then((data) => {
        // 保存登录状态和信息
        this.list = data.data;
        console.log(this.list)
      });
    }
  }
</script>
