import axios from 'axios'
import { API_PREFIX } from '../constants/settiings'

const instance = axios.create({
  baseURL: API_PREFIX,
  timeout: 5000,
})

instance.interceptors.request.use(req => {
  const token = localStorage.getItem('token') || ''
  if (token) req.headers.Authorization = token
  return req
})

instance.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.status === 401) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload()
  }
  return Promise.reject(err)
})

export default instance
