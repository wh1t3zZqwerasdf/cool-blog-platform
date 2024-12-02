export interface LoginRequestData {
  username: string
  password: string
}

export interface LoginResponseData {
  token: string
  userInfo: {
    id: string
    username: string
    role: string
  }
}

export interface LoginCodeResponseData {
  captchaId: string
  captchaImg: string
}
