<template>
  <div>
    <mu-paper :z-depth="1">
      <mu-data-table stripe selectable :columns="columns" :data="list" no-data-text="没有数据">
        <template slot-scope="scope">
          <td>{{scope.row.name}}</td>
          <td>{{scope.row.roleCode}}</td>
          <td class="is-center">
            <mu-button small icon title="编辑">
              <mu-icon value="edit"></mu-icon>
            </mu-button>
            <mu-button small icon title="删除">
              <mu-icon value="delete"></mu-icon>
            </mu-button>
            <mu-button small icon title="其他">
              <mu-icon value="flag"></mu-icon>
            </mu-button>
          </td>
        </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
  import {adminRoleList} from '@/api/core-api'


  export default {
    data() {
      return {
        columns: [
          {title: '角色', name: 'name', width: 300},
          {title: '编码', name: 'roleCode', width: 150},
          {title: '操作', name: '', width: 160, align: 'center'}
        ],
        list: []
      }
    },
    computed: {},
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
