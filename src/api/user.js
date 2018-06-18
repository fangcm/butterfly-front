import axios from './config'

export const userLogin = (data) => {
  return axios(`/core/user/login`, {
    method: 'POST',
    data
  })
    .then((response) => {
      return response.data
    })
}

export const getUserInfo = () => {
  return axios(`/core/user/currentInfo`)
    .then((response) => {
      return response.data
    })
}
