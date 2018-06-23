<template>
  <div>
    <mu-paper :z-depth="1">
      <mu-data-table stripe selectable :columns="columns" :data="list" no-data-text="没有数据">
        <template slot-scope="scope">
          <td>{{scope.row.rootLevel===0 ? "子":"父"}}</td>
          <td>{{scope.row.name}}</td>
          <td>
            <mu-icon small :value="scope.row.icon"/>
            {{scope.row.icon}}
          </td>
          <td>{{scope.row.path}}</td>
          <td>{{scope.row.parentId}}</td>
          <td>{{scope.row.sort}}</td>
          <td class="is-center">
            <mu-button small icon v-if="scope.row.status===0" title="启用">
              <mu-icon value="grade"/>
            </mu-button>
          </td>
        </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
import dataMenu from '@/api/data-menu'

export default {
  data () {
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
      list: dataMenu
    }
  },
  computed: {},
  methods: {}
}
</script>
