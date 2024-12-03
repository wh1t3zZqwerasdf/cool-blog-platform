import request from '@/utils/request'
import type { ApiResponse } from '@/types/auth'

export interface User {
  id: string
  username: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface UserListResponse {
  list: User[]
  total: number
}

export const userApi = {
  // 获取用户列表
  getUsers() {
    return request<ApiResponse<UserListResponse>>({
      url: '/api/users',
      method: 'get'
    })
  },

  // 删除用户
  deleteUser(id: string) {
    return request<ApiResponse<null>>({
      url: `/api/users/${id}`,
      method: 'delete'
    })
  },

  // 更新用户
  updateUser(id: string, data: Partial<User>) {
    return request<ApiResponse<User>>({
      url: `/api/users/${id}`,
      method: 'put',
      data
    })
  }
}
