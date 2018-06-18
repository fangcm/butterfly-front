import axios from './config'

export let userLogin = (data) => axios.post('/core/user/login', data)

export let getUserInfo = () => axios.get('/core/user/currentInfo')
