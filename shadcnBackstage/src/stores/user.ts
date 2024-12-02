import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api/auth'
import type { UserInfo, LoginForm } from '@/types/auth'
import { getToken, setToken, removeToken } from '@/utils/cache'

const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const userInfo = ref<UserInfo | null>(null)

  /** 登录 */
  async function login(loginForm: LoginForm) {
    try {
      const { token: newToken, user } = await authApi.login(loginForm)
      token.value = newToken
      setToken(newToken)
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
    removeToken()
  }

  return {
    token,
    userInfo,
    login,
    getUserInfo,
    logout,
    resetToken
  }
})

export const useUserStoreHook = () => {
  return useUserStore()
}

export default useUserStore
