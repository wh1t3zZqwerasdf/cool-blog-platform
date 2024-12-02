import request from '@/utils/request'
import type { LoginForm, LoginResponse, UserInfo } from '@/types/auth'

export function login(data: LoginForm) {
  return request<LoginResponse>({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request<UserInfo>({
    url: '/api/user/info',
    method: 'get'
  })
}

export function logout() {
  return request<void>({
    url: '/api/auth/logout',
    method: 'post'
  })
}
