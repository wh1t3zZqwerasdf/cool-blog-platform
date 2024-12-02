import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, logout } from '@/api/user'
import type { LoginData } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<any>(null)

  async function handleLogin(loginData: LoginData) {
    try {
      const res = await login(loginData)
      token.value = res.token
      userInfo.value = res.userInfo
      localStorage.setItem('token', res.token)
      return res
    } catch (error) {
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
      throw error
    }
  }

  async function handleLogout() {
    try {
      await logout()
    } finally {
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
    }
  }

  return {
    token,
    userInfo,
    login: handleLogin,
    logout: handleLogout
  }
})
