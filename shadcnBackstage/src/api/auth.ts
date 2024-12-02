import request from '@/utils/request'
import type { LoginForm, LoginResponse, UserInfo, UserInfoResponse } from '@/types/auth'

export const authApi = {
  login(data: LoginForm) {
    return request<LoginResponse>({
      url: '/api/auth/login',
      method: 'post',
      data
    })
  },

  getUserInfo() {
    return request<UserInfoResponse>({
      url: '/api/auth/user',
      method: 'get'
    })
  },

  logout() {
    return request<UserInfoResponse>({
      url: '/api/auth/logout',
      method: 'post'
    })
  }
}
