import axios from 'axios'
import { API_PREFIX } from '../constants/settiings'

const instance = axios.create({
  baseURL: API_PREFIX,
  timeout: 5000,
})

instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token') || ''
  if (token) cfg.headers.Authorization = token
  return cfg
})

export default instance
