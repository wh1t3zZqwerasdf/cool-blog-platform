// API 路径常量

export const API_PREFIX = '/v1';

export const API_ROUTES = {
  // 认证相关
  AUTH: {
    LOGIN: `${API_PREFIX}/auth/login`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
    REFRESH_TOKEN: `${API_PREFIX}/auth/refresh`,
  },
  
  // 文章相关
  ARTICLES: {
    LIST: `${API_PREFIX}/articles`,
    DETAIL: (id: string) => `${API_PREFIX}/articles/${id}`,
    CREATE: `${API_PREFIX}/articles`,
    UPDATE: (id: string) => `${API_PREFIX}/articles/${id}`,
    DELETE: (id: string) => `${API_PREFIX}/articles/${id}`,
    PUBLISH: (id: string) => `${API_PREFIX}/articles/${id}/publish`,
    ARCHIVE: (id: string) => `${API_PREFIX}/articles/${id}/archive`,
  },

  // 分类相关
  CATEGORIES: {
    LIST: `${API_PREFIX}/categories`,
    CREATE: `${API_PREFIX}/categories`,
    UPDATE: (id: string) => `${API_PREFIX}/categories/${id}`,
    DELETE: (id: string) => `${API_PREFIX}/categories/${id}`,
  },

  // 标签相关
  TAGS: {
    LIST: `${API_PREFIX}/tags`,
    CREATE: `${API_PREFIX}/tags`,
    DELETE: (id: string) => `${API_PREFIX}/tags/${id}`,
  },
}
