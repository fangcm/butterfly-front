var dataUser = [
  {
    id: 10,
    name: '生产业务',
    rootLevel: 1,
    icon: 'comment',
    path: '/',
    parentId: '',
    sort: 1,
    children: [
      {id: 11, name: '表格', rootLevel: 0, icon: '', path: '/', parentId: '10', sort: 1},
      {id: 12, name: '数据', rootLevel: 0, icon: '', path: '/', parentId: '10', sort: 2}
    ]
  },
  {
    id: 13,
    name: '食堂',
    rootLevel: 1,
    icon: 'wb_cloudy',
    path: '/',
    parentId: '',
    sort: 2,
    children: [
      {id: 14, name: '菜品', rootLevel: 0, icon: '', path: '/', parentId: '13', sort: 1},
      {id: 15, name: '意见吐槽', rootLevel: 0, icon: '', path: '/', parentId: '13', sort: 2},
      {id: 16, name: '评选好吃的菜', rootLevel: 0, icon: '', path: '/', parentId: '13', sort: 3},
      {id: 17, name: '排队领号', rootLevel: 0, icon: '', path: '/', parentId: '13', sort: 4},
      {id: 18, name: '预定', rootLevel: 0, icon: '', path: '/', parentId: '13', sort: 5}
    ]
  },
  {
    id: 19,
    name: '其他',
    rootLevel: 1,
    icon: 'wb_sunny',
    path: '/',
    parentId: '',
    sort: 3,
    children: [
      {id: 20, name: '游戏', rootLevel: 0, icon: '', path: '/', parentId: '19', sort: 1},
      {id: 21, name: '发礼品', rootLevel: 0, icon: '', path: '/', parentId: '19', sort: 2},
      {id: 22, name: '送东西', rootLevel: 0, icon: '', path: '/', parentId: '19', sort: 3},
      {id: 23, name: '系统管理', rootLevel: 0, icon: '', path: '/admin/user', parentId: '19', sort: 4}
    ]
  }
]

export default dataUser
