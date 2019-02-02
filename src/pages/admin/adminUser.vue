<template>
  <div>
    <mu-paper :z-depth="1">
      <mu-data-table stripe selectable :columns="columns" :data="list" no-data-text="没有数据">
        <template slot-scope="scope">
          <td>{{scope.row.mobile}}</td>
          <td>{{scope.row.nickName}}</td>
          <td style="color: red">{{scope.row.status===0 ? "":"禁用"}}</td>
          <td>{{scope.row.email}}</td>
          <td>{{scope.row.remarks}}</td>
          <td class="is-center">
            <mu-button small icon title="编辑">
              <mu-icon value="edit"></mu-icon>
            </mu-button>
            <mu-button small icon title="删除">
              <mu-icon value="delete"></mu-icon>
            </mu-button>
            <mu-button small icon v-if="scope.row.status===0" title="禁用">
              <mu-icon value="report"></mu-icon>
            </mu-button>
            <mu-button small icon v-if="scope.row.status===1" title="启用">
              <mu-icon value="flag"></mu-icon>
            </mu-button>
          </td>
        </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
  import {adminUserList} from '@/api/user-api'

  export default {
    data() {
      return {
        columns: [
          {title: '手机号', name: 'mobile', width: 140},
          {title: '昵称', name: 'nickName', width: 110},
          {title: '状态', name: 'status', width: 80},
          {title: '电子邮件', name: 'email', width: 250},
          {title: '备注', name: 'remarks', width: 200},
          {title: '操作', name: '', width: 160, align: 'center'}
        ],
        list: []
      }
    },
    computed: {},
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
