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

// 用户角色类型
export type UserRole = 'Admin' | 'Guest'

// 用户查询参数接口
export interface UserQueryParams {
  page?: number
  pageSize?: number
  role?: UserRole
}

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  email: string
  role: UserRole
  createdAt: string
}

// 分页响应接口
export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export const userApi = {
  // 获取用户列表
  getUsers(params: { page: number; pageSize: number; role?: string }) {
    return request({
      url: '/api/users/list',
      method: 'post',
      data: params
    }) as Promise<ApiResponse<UserListResponse>>
  },

  // 注册用户
  register(data: RegisterUserParams) {
    return request({
      url: '/api/auth/register',
      method: 'post',
      data
    })
  },

  // 删除用户
  deleteUser(id: string) {
    return request({
      url: `/api/users/${id}`,
      method: 'delete'
    })
  },

  // 更新用户
  updateUser(id: string, data: Partial<User>) {
    return request({
      url: `/api/users/${id}`,
      method: 'put',
      data
    })
  },
}
