import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('@/views/articles/index.vue'),
        meta: {
          title: '文章管理',
          icon: 'document'
        }
      },
      {
        path: 'articles/create',
        name: 'CreateArticle',
        component: () => import('@/views/articles/edit.vue'),
        meta: {
          title: '创建文章',
          icon: 'edit'
        }
      },
      {
        path: 'articles/edit/:id',
        name: 'EditArticle',
        component: () => import('@/views/articles/edit.vue'),
        meta: {
          title: '编辑文章',
          icon: 'edit'
        }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/categories/index.vue'),
        meta: {
          title: '分类管理',
          icon: 'folder'
        }
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/tags/index.vue'),
        meta: {
          title: '标签管理',
          icon: 'price-tag'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: '个人设置',
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - 博客管理系统`

  // 获取token
  const token = localStorage.getItem('token')

  // 判断页面是否需要登录权限
  if (to.meta.requiresAuth) {
    if (!token) {
      // 未登录，跳转到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (token && to.path === '/login') {
      // 已登录且要跳转登录页，重定向到首页
      next({ path: '/' })
    } else {
      next()
    }
  }
})

export default router
