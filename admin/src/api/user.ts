import request from '@/utils/request'

export interface LoginData {
  username?: string
  email?: string
  password: string
}

export interface LoginResponse {
  token: string
  userInfo: {
    id: string
    username: string
    email: string
    role: string
  }
}

export function login(data: LoginData) {
  return request<LoginResponse>({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function getLoginCode() {
  return request<{
    captchaId: string
    captchaImg: string
  }>({
    url: '/api/auth/captcha',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}
