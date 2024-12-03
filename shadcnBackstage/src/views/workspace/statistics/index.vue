<!-- 统计数据页面 -->
<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <!-- 顶部部分 -->
        <div class="flex-1 bg-muted/50 rounded-xl max-h-[100px] flex items-center justify-center">
          <p class="text-muted-foreground">顶部部分</p>
        </div>
        <!-- 上半部分：卡片网格 -->
        <div class="grid auto-rows-min gap-4 md:grid-cols-4">
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <!-- 下半部分：分成左右两栏 -->
        <div class="flex flex-col md:flex-row  gap-4 md:min-h-min">
          <div class="flex-1 bg-muted/50 rounded-xl">
            <ChartCard class="h-[500px] px-0 py-4" />
          </div>
          <div class="flex-1 bg-muted/50 rounded-xl">
            <!-- Right side is empty -->
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import ChartCard from '@/views/workspace/statistics/components/ChartCard.vue'
</script>
