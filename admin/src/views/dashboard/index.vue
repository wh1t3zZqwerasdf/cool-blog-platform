<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <el-card class="hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <el-icon class="text-3xl text-primary mr-4"><document /></el-icon>
          <div>
            <div class="text-gray-500 text-sm">文章总数</div>
            <div class="text-2xl font-bold mt-1">{{ statistics.totalArticles }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <el-icon class="text-3xl text-success mr-4"><view /></el-icon>
          <div>
            <div class="text-gray-500 text-sm">总浏览量</div>
            <div class="text-2xl font-bold mt-1">{{ statistics.totalViews }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <el-icon class="text-3xl text-warning mr-4"><folder /></el-icon>
          <div>
            <div class="text-gray-500 text-sm">分类数量</div>
            <div class="text-2xl font-bold mt-1">{{ statistics.totalCategories }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <el-icon class="text-3xl text-error mr-4"><price-tag /></el-icon>
          <div>
            <div class="text-gray-500 text-sm">标签数量</div>
            <div class="text-2xl font-bold mt-1">{{ statistics.totalTags }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 最近一周文章发布趋势 -->
      <el-card class="hover:shadow-md transition-shadow">
        <template #header>
          <div class="flex items-center justify-between">
            <span>文章发布趋势</span>
            <el-tag size="small" type="info">最近7天</el-tag>
          </div>
        </template>
        <div class="h-80">
          <div ref="articleTrendChartRef" class="w-full h-full"></div>
        </div>
      </el-card>

      <!-- 分类文章占比 -->
      <el-card class="hover:shadow-md transition-shadow">
        <template #header>
          <div class="flex items-center justify-between">
            <span>分类文章占比</span>
            <el-button type="primary" link @click="refreshData">
              <el-icon><refresh /></el-icon>
            </el-button>
          </div>
        </template>
        <div class="h-80">
          <div ref="categoryPieChartRef" class="w-full h-full"></div>
        </div>
      </el-card>
    </div>

    <!-- 最新文章列表 -->
    <el-card class="mt-6 hover:shadow-md transition-shadow">
      <template #header>
        <div class="flex items-center justify-between">
          <span>最新文章</span>
          <el-button type="primary" link @click="router.push('/articles')">
            查看全部
          </el-button>
        </div>
      </template>
      <el-table :data="latestArticles" style="width: 100%">
        <el-table-column prop="title" label="标题" min-width="200">
          <template #default="{ row }">
            <el-link type="primary" @click="router.push(`/articles/edit/${row._id}`)">
              {{ row.title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="views" label="浏览量" width="100" align="center" />
        <el-table-column prop="createdAt" label="发布时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.published ? 'success' : 'info'">
              {{ row.published ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { Document, View, Folder, PriceTag, Refresh } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/date'
import axios from '@/utils/axios'

const router = useRouter()

// 图表实例
const articleTrendChartRef = ref<HTMLElement>()
const categoryPieChartRef = ref<HTMLElement>()
let articleTrendChart: echarts.ECharts | null = null
let categoryPieChart: echarts.ECharts | null = null

// 数据
const statistics = ref({
  totalArticles: 0,
  totalViews: 0,
  totalCategories: 0,
  totalTags: 0
})

const latestArticles = ref([])

// 初始化图表
const initCharts = () => {
  if (articleTrendChartRef.value) {
    articleTrendChart = echarts.init(articleTrendChartRef.value)
  }
  if (categoryPieChartRef.value) {
    categoryPieChart = echarts.init(categoryPieChartRef.value)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  articleTrendChart?.resize()
  categoryPieChart?.resize()
}

// 销毁图表
const destroyCharts = () => {
  articleTrendChart?.dispose()
  categoryPieChart?.dispose()
  articleTrendChart = null
  categoryPieChart = null
}

// 获取统计数据
const fetchStatistics = async () => {
  try {
    const response = await axios.get('/api/dashboard/statistics')
    statistics.value = response.data
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

// 获取最新文章
const fetchLatestArticles = async () => {
  try {
    const response = await axios.get('/api/articles/latest')
    latestArticles.value = response.data
  } catch (error) {
    console.error('获取最新文章失败:', error)
  }
}

// 获取文章趋势数据
const fetchArticleTrend = async () => {
  try {
    const response = await axios.get('/api/dashboard/article-trend')
    const { dates, counts } = response.data
    
    articleTrendChart?.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: dates
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: counts,
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.3
        }
      }]
    })
  } catch (error) {
    console.error('获取文章趋势数据失败:', error)
  }
}

// 获取分类占比数据
const fetchCategoryDistribution = async () => {
  try {
    const response = await axios.get('/api/dashboard/category-distribution')
    const data = response.data
    
    categoryPieChart?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }]
    })
  } catch (error) {
    console.error('获取分类占比数据失败:', error)
  }
}

// 刷新所有数据
const refreshData = async () => {
  await Promise.all([
    fetchStatistics(),
    fetchLatestArticles(),
    fetchArticleTrend(),
    fetchCategoryDistribution()
  ])
}

onMounted(() => {
  initCharts()
  refreshData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  destroyCharts()
  window.removeEventListener('resize', handleResize)
})
</script>
