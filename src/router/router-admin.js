import AdminMain from '@/views/admin/AdminMain'
import AdminUser from '@/views/admin/AdminUser'
import AdminRole from '@/views/admin/AdminRole'
import AdminMenu from '@/views/admin/AdminMenu'

const adminRouter = [
  {
    path: '/admin',
    component: AdminMain,
    children: [
      {
        path: 'user',
        component: AdminUser
      },
      {
        path: 'role',
        component: AdminRole
      },
      {
        path: 'menu',
        component: AdminMenu
      }
    ]
  }
]

export default adminRouter
