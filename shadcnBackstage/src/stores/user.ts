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
      const { data, success, message } = await authApi.login(loginForm)
      console.log('Login response:', data)
      
      if (success && data.token) {
        // 保存 token
        token.value = data.token
        setToken(data.token)
        // 保存用户信息
        userInfo.value = data.userInfo
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  /** 获取用户信息 */
  async function getUserInfo() {
    if (!token.value) return null
    try {
      const response = await authApi.getUserInfo()
      if (response) {
        userInfo.value = response.data
        return response
      }
      return null
    } catch {
      return null
    }
  }

  /** 登出 */
  async function logout() {
    try {
      await authApi.logout()
      resetToken()
      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
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
