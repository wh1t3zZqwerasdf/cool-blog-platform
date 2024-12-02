// 文章相关类型定义

export interface Article {
  _id: string;
  title: string;
  content: string;
  description: string;
  cover?: string;
  category: string;
  tags: string[];
  status: ArticleStatus;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export enum ArticleStatus {
  Draft = 'draft',      // 草稿
  Published = 'published', // 已发布
  Archived = 'archived'   // 已归档
}

// 文章列表查询参数
export interface ArticleQuery {
  page: number;
  pageSize: number;
  keyword?: string;
  category?: string;
  tag?: string;
  status?: ArticleStatus;
  startDate?: string;
  endDate?: string;
}

// 文章列表响应
export interface ArticleListResponse {
  total: number;
  items: Article[];
}
