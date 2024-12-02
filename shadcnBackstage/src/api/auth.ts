import request from '@/utils/request'
import type { LoginForm, LoginResponse, UserInfo } from '@/types/auth'

export const authApi = {
  login(data: LoginForm) {
    return request<LoginResponse>({
      url: '/api/auth/login',
      method: 'post',
      data
    })
  },

  getUserInfo() {
    return request<UserInfo>({
      url: '/api/user/info',
      method: 'get'
    })
  },

  logout() {
    return request<void>({
      url: '/api/auth/logout',
      method: 'post'
    })
  }
}
