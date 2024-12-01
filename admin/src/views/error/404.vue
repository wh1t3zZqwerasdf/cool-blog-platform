<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <p class="text-2xl text-gray-600 mt-4">页面未找到</p>
      <p class="text-gray-500 mt-2">抱歉，您访问的页面不存在</p>
      <el-button type="primary" class="mt-8" @click="router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
