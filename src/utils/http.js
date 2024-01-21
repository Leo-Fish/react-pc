import axios from 'axios'
import { getToken } from '@/utils'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

http.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use((response) => {
  return response
}, (err) => {
  if (err.response.status === 401) {
    window.location.href = '/login'
  }
  return Promise.reject(err)
})


export { http }