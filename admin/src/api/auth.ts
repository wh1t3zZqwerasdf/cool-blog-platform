import { request } from './request'
import type { LoginRequestData, LoginResponseData, LoginCodeResponseData } from './types/auth'

export function loginApi(data: LoginRequestData) {
  return request.post<LoginResponseData>('/api/auth/login', data)
}

export function getLoginCodeApi() {
  return request.get<LoginCodeResponseData>('/api/auth/login/code')
}

export function logoutApi() {
  return request.post('/api/auth/logout')
}
