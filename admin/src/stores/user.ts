import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const role = ref(localStorage.getItem('role') || '')

  // 登录
  const login = async (loginData: { email: string; password: string }) => {
    try {
      const response = await axios.post('/api/auth/login', loginData)
      const { token: newToken, user } = response.data

      // 保存到 store
      token.value = newToken
      username.value = user.username
      role.value = user.role

      // 保存到 localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('username', user.username)
      localStorage.setItem('role', user.role)

      // 设置 axios 默认 header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  // 登出
  const logout = () => {
    // 清除 store
    token.value = ''
    username.value = ''
    role.value = ''

    // 清除 localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')

    // 清除 axios header
    delete axios.defaults.headers.common['Authorization']
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await axios.get('/api/auth/profile')
      const user = response.data
      username.value = user.username
      role.value = user.role
      return user
    } catch (error) {
      console.error('Get user info failed:', error)
      return null
    }
  }

  return {
    token,
    username,
    role,
    login,
    logout,
    getUserInfo
  }
})
