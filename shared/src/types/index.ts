// 文章接口
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 用户接口
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: Date;
}

// 分类接口
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

// API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
