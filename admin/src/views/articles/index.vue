<template>
  <div class="articles-page">
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span>文章管理</span>
          <el-button type="primary" @click="router.push('/articles/create')">
            创建文章
          </el-button>
        </div>
      </template>
      <div>文章列表（开发中）</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
