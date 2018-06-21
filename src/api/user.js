import axios from './http'

export let userLogin = (data) => axios.post('/core/user/login', data)

export let getUserInfo = () => axios.get('/core/user/currentInfo')
