import request from '@/utils/request'
import type { LoginForm, LoginResponse, UserInfo, ApiResponse } from '@/types/auth'

export const authApi = {
  login(data: LoginForm) {
    return request<ApiResponse<LoginResponse>>({
      url: '/api/auth/login',
      method: 'post',
      data
    })
  },

  getUserInfo() {
    return request<ApiResponse<UserInfo>>({
      url: '/api/auth/user',
      method: 'get'
    })
  },

  logout() {
    return request<ApiResponse<null>>({
      url: '/api/auth/logout',
      method: 'post'
    })
  }
}
