export interface LoginForm {
  email: string
  password: string
}

export interface UserInfo {
  id: string
  username: string
  email: string
  role: string
}

export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

export interface ApiResponse<T> {
  code: number
  success: boolean
  message: string
  data: T
}
