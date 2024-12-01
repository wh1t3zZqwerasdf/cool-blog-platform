<template>
  <div class="min-h-screen flex">
    <!-- 侧边栏 -->
    <aside class="w-sidebar bg-white shadow-sm fixed h-full">
      <div class="h-header flex items-center justify-center border-b">
        <h1 class="text-xl font-bold text-primary">博客管理系统</h1>
      </div>
      <nav class="py-4">
        <router-link
          v-for="route in mainRoutes"
          :key="route.path"
          :to="route.path"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-primary hover:bg-opacity-10 hover:text-primary"
          :class="{ 'bg-primary bg-opacity-10 text-primary': isCurrentRoute(route.path) }"
        >
          <el-icon class="mr-2">
            <component :is="route?.meta?.icon" />
          </el-icon>
          {{ route?.meta?.title }}
        </router-link>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="flex-1 ml-sidebar">
      <!-- 顶部导航栏 -->
      <header class="h-header bg-white shadow-sm fixed top-0 right-0 left-sidebar flex items-center justify-between px-6">
        <div class="flex items-center">
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentRoute?.meta?.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex items-center">
          <el-dropdown>
            <span class="flex items-center cursor-pointer">
              <el-avatar :size="32" class="mr-2" />
              {{ userStore.username }}
              <el-icon class="ml-1"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/profile')">
                  <el-icon><user /></el-icon>
                  个人设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><switch-button /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="p-6 mt-header">
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
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessageBox } from 'element-plus'
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 获取主要路由（不包括登录和404页面）
const mainRoutes = computed(() => {
  return router.options.routes
    .find(route => route.path === '/')
    ?.children?.filter(route => route.meta?.icon) || []
})

// 获取当前路由
const currentRoute = computed(() => {
  return mainRoutes.value.find(r => r.path === route.path)
})

// 判断是否是当前路由
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
