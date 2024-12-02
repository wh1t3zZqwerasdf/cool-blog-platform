import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

interface RequestConfig extends AxiosRequestConfig {
  skipErrorHandler?: boolean
}

class Request {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error) => {
        if (!error.config?.skipErrorHandler) {
          this.handleError(error)
        }
        return Promise.reject(error)
      }
    )
  }

  private handleError(error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          window.location.href = '/login'
          ElMessage.error('登录已过期，请重新登录')
          break
        case 403:
          ElMessage.error('没有权限访问此资源')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器错误')
          break
        default:
          ElMessage.error(error.response.data?.message || '未知错误')
      }
    } else if (error.request) {
      ElMessage.error('网络错误，请检查您的网络连接')
    } else {
      ElMessage.error('请求配置错误')
    }
  }

  public async request<T = any>(config: RequestConfig): Promise<T> {
    try {
      const response = await this.instance.request<any, T>(config)
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public get<T = any>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  public put<T = any>(url: string, data?: any, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  public delete<T = any>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}

export const request = new Request()
