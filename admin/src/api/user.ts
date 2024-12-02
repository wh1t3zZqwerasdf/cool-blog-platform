import request from '@/utils/request'

interface LoginData {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  userInfo: {
    id: string
    username: string
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
    url: '/api/auth/login/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}
