export interface LoginForm {
  email: string
  password: string
}

export interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  roles: string[]
}

export interface LoginResponse {
  token: string
  user: UserInfo
}
