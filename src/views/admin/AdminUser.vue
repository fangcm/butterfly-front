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
            <mu-button small icon v-if="scope.row.status===0" title="启用">
              <mu-icon value="grade"></mu-icon>
            </mu-button>
          </td>
        </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
import dataUser from '@/api/data-user'

export default {
  data () {
    return {
      columns: [
        {title: '手机号', name: 'mobile', width: 140},
        {title: '昵称', name: 'nickName', width: 110},
        {title: '状态', name: 'status', width: 80},
        {title: '电子邮件', name: 'email', width: 250},
        {title: '备注', name: 'remarks', width: 200},
        {title: '操作', name: '', width: 80, align: 'center'}
      ],
      list: dataUser
    }
  },
  computed: {},
  methods: {}
}
</script>
