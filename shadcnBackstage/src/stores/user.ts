import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api/auth'
import type { UserInfo, LoginForm } from '@/types/auth'

const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)

  /** 登录 */
  async function login(loginForm: LoginForm) {
    try {
      const { token: newToken, user } = await authApi.login(loginForm)
      token.value = newToken
      localStorage.setItem('token', newToken)
      userInfo.value = user
      return true
    } catch (error) {
      return false
    }
  }

  /** 获取用户信息 */
  async function getUserInfo() {
    if (!token.value) return null
    try {
      const data = await authApi.getUserInfo()
      userInfo.value = data
      return data
    } catch {
      return null
    }
  }

  /** 登出 */
  async function logout() {
    try {
      await authApi.logout()
    } finally {
      resetToken()
    }
  }

  /** 重置 Token */
  function resetToken() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    login,
    logout,
    getUserInfo,
    resetToken
  }
})

export default useUserStore

// 非setup
export function useUserStoreHook() {
  return useUserStore()
}
