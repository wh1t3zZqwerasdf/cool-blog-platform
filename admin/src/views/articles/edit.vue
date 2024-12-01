<template>
  <div class="article-edit">
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span>{{ isEdit ? '编辑文章' : '创建文章' }}</span>
        </div>
      </template>
      <div>文章编辑器（开发中）</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEdit = computed(() => route.params.id !== undefined)
</script>
