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

// 注册用户请求参数接口
export interface RegisterUserParams {
  username: string
  email: string
  password: string
}

export const userApi = {
  // 获取用户列表
  getUsers(params: { page: number; pageSize: number }) {
    return request<ApiResponse<UserListResponse>>({
      url: '/api/users',
      method: 'GET',
      params
    })
  },

  // 注册用户
  register(data: RegisterUserParams) {
    return request<ApiResponse<User>>({
      url: '/api/auth/register',
      method: 'POST',
      data
    })
  },

  // 删除用户
  deleteUser(id: string) {
    return request<ApiResponse<null>>({
      url: `/api/users/${id}`,
      method: 'DELETE'
    })
  },

  // 更新用户
  updateUser(id: string, data: Partial<User>) {
    return request<ApiResponse<User>>({
      url: `/api/users/${id}`,
      method: 'PUT',
      data
    })
  }
}
