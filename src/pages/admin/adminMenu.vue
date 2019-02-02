<template>
  <div>
    <mu-list textline="three-line">
      <template v-for="item in list">
        <mu-sub-header>
          {{item.name}}
        </mu-sub-header>
        <template v-for="child in item.children">
          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-action>
              <mu-avatar>
                <mu-icon :value="child.icon"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{child.name}}</mu-list-item-title>
              <mu-list-item-sub-title>
                <span style="color: rgba(0, 0, 196, .87)">跳转路径 -</span>{{child.path}}<br/>
                <span style="color: rgba(0, 0, 196, .87)">排序 -</span>{{child.sort}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
        </template>
      </template>
    </mu-list>
  </div>
</template>

<script>
  import {adminMenuList} from '@/api/user-api'


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
