<template>
  <div class="layout-wrapper">
    <!-- 顶部导航栏 -->
    <header class="layout-header">
      <div class="flex items-center justify-between h-full px-4">
        <div class="flex items-center space-x-4">
          <button 
            class="md:hidden p-2 rounded-md hover:bg-gray-100"
            @click="toggleSidebar"
          >
            <el-icon><Menu /></el-icon>
          </button>
          
          <h1 class="text-xl font-bold text-primary">博客管理系统</h1>
          
          <div class="h-6 w-[1px] bg-gray-200"></div>
          
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentRoute?.meta?.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <el-dropdown>
          <div class="flex items-center space-x-2 cursor-pointer">
            <el-avatar :size="32" />
            <span class="hidden md:inline">{{ userStore.username }}</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/profile')">
                <el-icon><User /></el-icon>
                个人设置
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- 侧边栏 -->
    <aside 
      class="layout-sidebar"
      :class="{ 'collapsed': isCollapsed }"
    >
      <nav class="h-full overflow-y-auto">
        <router-link
          v-for="route in mainRoutes"
          :key="route.path"
          :to="route.path"
          class="sidebar-menu-item"
          :class="{ 'active': isCurrentRoute(route.path) }"
        >
          <el-icon class="mr-2">
            <component :is="route?.meta?.icon" />
          </el-icon>
          <span class="truncate">{{ route?.meta?.title }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- 主体内容 -->
    <main 
      class="layout-main"
      :class="{ 'sidebar-collapsed': isCollapsed }"
    >
      <div class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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

// 侧边栏状态
const isCollapsed = ref(false)

// 根据屏幕宽度初始化侧边栏状态
const initSidebarState = () => {
  isCollapsed.value = window.innerWidth < 768
}

// 切换侧边栏
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
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

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
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
    userStore.handleLogout()
    router.push('/login')
  })
}
</script>