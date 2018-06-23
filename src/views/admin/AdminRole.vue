<template>
  <div>
    <mu-paper :z-depth="1">
      <mu-data-table stripe selectable :columns="columns" :data="list" no-data-text="没有数据">
        <template slot-scope="scope">
          <td>{{scope.row.name}}</td>
          <td>{{scope.row.roleCode}}</td>
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
import dataRole from '@/api/data-role'

export default {
  data () {
    return {
      columns: [
        {title: '角色', name: 'name', width: 300},
        {title: '编码', name: 'roleCode', width: 150},
        {title: '操作', name: '', width: 80, align: 'center'}
      ],
      list: dataRole
    }
  },
  computed: {},
  methods: {}
}
</script>
