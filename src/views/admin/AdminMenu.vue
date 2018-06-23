<template xmlns:padding="http://www.w3.org/1999/xhtml">
  <div>
    <div v-for="item in list" :key="item.id">
      <mu-card>
        <mu-card-header :title="item.name" :subTitle="item.path">
          <mu-icon :value="item.icon"></mu-icon>
        </mu-card-header>
      </mu-card>
      <mu-card v-for="child in item.children" :key="child.id">
        <mu-card-header :title="child.name" :subTitle="child.path">
          <mu-icon :value="child.icon"></mu-icon>
        </mu-card-header>
      </mu-card>
    </div>
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
