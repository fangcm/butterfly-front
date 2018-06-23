import Login from '@/views/Login'
import Header from '@/components/Header'

var layoutRouter = [
  // 登录页
  {
    path: '/login',
    components: {
      header: Header,
      body: Login
    }
  }
]

export default layoutRouter
