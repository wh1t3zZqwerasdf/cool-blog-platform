<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="layout-header bg-white shadow-sm z-40 mb-2">
      <div class="flex items-center justify-between h-full px-4">
        <div class="flex items-center space-x-4">
          <button class="lg:hidden p-2 rounded-md hover:bg-gray-100" @click="isCollapsed = !isCollapsed">
            <el-icon>
              <Menu />
            </el-icon>
          </button>

          <!-- 系统标题 -->
          <h1 class="text-xl font-bold text-primary">博客管理系统</h1>

          <div class="h-6 w-[1px] bg-gray-200"></div>

          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentRoute?.meta?.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 用户信息下拉菜单 -->
        <el-dropdown>
          <div class="navbar-dropdown">
            <div class="navbar-avatar">
              <el-avatar :size="32" />
            </div>
            <span class="hidden lg:inline">{{ userStore.username }}</span>
            <el-icon>
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/profile')">
                <el-icon>
                  <User />
                </el-icon>
                个人设置
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon>
                  <SwitchButton />
                </el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class=" flex-1 t-[60px] flex h-[calc(100vh-60px)]">
      <!-- 侧边栏 -->
      <aside class="layout-sidebar bg-white shadow-lg mt-2 overflow-hidden transition-all duration-300"
        :style="{ width: isCollapsed ? '0px' : '240px' }">
        <!-- 侧边栏菜单 -->
        <nav class="h-full overflow-y-auto py-2 w-[240px]">
          <router-link v-for="route in mainRoutes" :key="route.path" :to="route.path" class="sidebar-menu-item"
            :class="{ 'active': isCurrentRoute(route.path) }">
            <el-icon class="sidebar-menu-icon">
              <component :is="route?.meta?.icon" />
            </el-icon>
            <span class="truncate">{{ route?.meta?.title }}</span>
          </router-link>
        </nav>
      </aside>

      <!-- 主体内容 -->
      <main class="flex-1 p-2  overflow-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'
import {
  ArrowDown,
  User,
  SwitchButton,
  Menu
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 侧边栏折叠状态
const isCollapsed = ref(false)

// 根据屏幕宽度初始化侧边栏状态
const initSidebarState = () => {
  // 在小屏幕（移动设备）时默认折叠
  isCollapsed.value = window.innerWidth <= 1024
}

// 监听窗口大小变化
const handleResize = () => {
  initSidebarState()
}

// 在组件挂载时初始化
onMounted(() => {
  initSidebarState()
  window.addEventListener('resize', handleResize)
})

// 获取主要路由
const mainRoutes = computed(() => {
  return router.options.routes
    .find(route => route.path === '/')
    ?.children?.filter(route => route.meta?.icon) || []
})

// 获取当前路由
const currentRoute = computed(() => {
  return mainRoutes.value.find(r => r.path === route.path)
})

// 判断是否为当前路由
const isCurrentRoute = (path: string) => {
  return route.path === path
}

// 处理退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    router.push('/login')
  })
}
</script>