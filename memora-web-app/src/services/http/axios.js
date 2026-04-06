import axios from 'axios'
import { getCurrentUser } from '../../utils/user'

// 创建axios实例
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
httpClient.interceptors.request.use(
  (config) => {
    const currentUser = getCurrentUser()
    if (currentUser?.accessToken) {
      config.headers.Authorization = `Bearer ${currentUser.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
httpClient.interceptors.response.use(
  (response) => {
    // 直接返回后端响应的数据
    return response.data
  },
  (error) => {
    // 处理错误响应
    if (error.response) {
      const { status, data } = error.response
      if (status === 404) {
        console.error('请求的资源不存在')
      } else if (status === 500) {
        console.error('服务器错误')
      }
      return Promise.reject(data || error)
    } else if (error.request) {
      console.error('网络错误，请检查网络连接')
      return Promise.reject({ code: 500, message: '网络错误，请检查网络连接' })
    } else {
      console.error('请求配置错误', error.message)
      return Promise.reject({ code: 500, message: error.message })
    }
  }
)

export default httpClient
