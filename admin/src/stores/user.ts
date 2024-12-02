import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, logout } from '../api/user'
import type { LoginData } from '../api/user'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<any>(null)
  const router = useRouter()

  async function handleLogin(loginData: LoginData) {
    try {
      // 确保只传递需要的字段
      const loginPayload: LoginData = {
        password: loginData.password
      }
      
      // 根据提供的登录类型添加相应字段
      if (loginData.username) {
        loginPayload.username = loginData.username
      } else if (loginData.email) {
        loginPayload.email = loginData.email
      }

      const res = await login(loginPayload)
      token.value = res.token
      userInfo.value = res.userInfo
      localStorage.setItem('token', res.token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  async function handleLogout() {
    try {
      await logout()
    } finally {
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
      // 退出后导航到登录页
      router.push('/login')
    }
  }

  return {
    token,
    userInfo,
    handleLogin,
    handleLogout
  }
})
