import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { SquareTerminal, Bot, Settings2, BookOpen } from 'lucide-vue-next'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/dashboard/index.vue'),
    children: [
      {
        path: 'workspace',
        name: 'Workspace',
        component: () => import('@/views/workspace/index.vue'),
        meta: {
          title: '工作台',
          icon: SquareTerminal
        },
        redirect: '/workspace/statistics',
        children: [
          {
            path: 'statistics',
            name: 'WorkspaceStatistics',
            component: () => import('@/views/workspace/statistics/index.vue'),
            meta: {
              title: '统计数据'
            }
          }
        ]
      },
      {
        path: 'content',
        name: 'Content',
        component: () => import('@/views/content/index.vue'),
        meta: {
          title: '内容管理',
          icon: Bot
        },
        redirect: '/content/articles',
        children: [
          {
            path: 'articles',
            name: 'Articles',
            component: () => import('@/views/content/articles/index.vue'),
            meta: {
              title: '文章管理'
            }
          },
          {
            path: 'categories',
            name: 'Categories',
            component: () => import('@/views/content/categories/index.vue'),
            meta: {
              hidden: true
            }
          },
          {
            path: 'tags',
            name: 'Tags',
            component: () => import('@/views/content/tags/index.vue'),
            meta: {
              hidden: true
            }
          }
        ]
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
          title: '系统设置',
          icon: Settings2
        },
        redirect: '/settings/basic',
        children: [
          {
            path: 'basic',
            name: 'BasicSettings',
            component: () => import('@/views/settings/basic/index.vue'),
            meta: {
              title: '基本设置'
            }
          },
          {
            path: 'users',
            name: 'UserManagement',
            component: () => import('@/views/settings/users/index.vue'),
            meta: {
              title: '用户管理'
            }
          },
          {
            path: 'overview',
            name: 'SettingsOverview',
            component: () => import('@/views/settings/overview/index.vue'),
            meta: {
              title: '概览'
            }
          }
        ]
      },
      {
        path: 'docs',
        name: 'Documentation',
        component: () => import('@/views/docs/index.vue'),
        meta: {
          title: '系统文档',
          icon: BookOpen
        },
        redirect: '/docs/introduction',
        children: [
          {
            path: 'introduction',
            name: 'Introduction',
            component: () => import('@/views/docs/introduction/index.vue'),
            meta: {
              title: '介绍'
            }
          },
          {
            path: 'changelog',
            name: 'Changelog',
            component: () => import('@/views/docs/changelog/index.vue'),
            meta: {
              title: '更新日志'
            }
          }
        ]
      },
      {
        path: '',
        redirect: '/workspace'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
