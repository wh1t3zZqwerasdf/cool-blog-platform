import axios, { type AxiosRequestConfig } from 'axios'
import { useMessage } from '@/hooks'
import { useUserStoreHook } from '@/stores/user'
const message = useMessage()

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStoreHook()
    if (userStore.token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data
    if (code === 200) {
      return data
    }

    if (code === 401) {
      const userStore = useUserStoreHook()
      userStore.resetToken()
      window.location.href = '/login'
      message.error('登录已过期，请重新登录')
    }

    message.error(message || '请求失败')
    return Promise.reject(new Error(message || 'Error'))
  },
  (error) => {
    message.error(error.response?.data?.msg || '网络错误')
    return Promise.reject(error)
  }
)

// 请求方法
export default function request<T = any>(config: AxiosRequestConfig) {
  return service.request<any, T>(config)
}