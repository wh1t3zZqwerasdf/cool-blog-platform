import axios, { type AxiosRequestConfig } from 'axios'
import { useMessage } from '@/hooks'
import { useUserStoreHook } from '@/stores/user'
import { useRouter } from 'vue-router'

const message = useMessage()
const router = useRouter()

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStoreHook()
    const token = userStore.token
    if (token) {
      // 确保 config.headers 存在
      config.headers = config.headers || {}
      // 设置 Authorization header
      config.headers['Authorization'] = `Bearer ${token}`
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
    const { code, message: msg, data } = response.data
    if (code === 200) {
      return response.data
    }

    if (code === 401) {
      const userStore = useUserStoreHook()
      userStore.resetToken()
      router.push('/login')
      message.error('登录已过期，请重新登录')
    }

    message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error) => {
    message.error(error.response?.data?.message || '网络错误')
    return Promise.reject(error)
  }
)

// 导出请求方法
export default function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return service.request(config)
}