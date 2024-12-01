<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">博客管理系统</h2>
        <p class="mt-2 text-sm text-gray-600">请登录您的账号</p>
      </div>
      
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            type="email"
            placeholder="邮箱地址"
            :prefix-icon="Message"
            class="rounded-md"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            class="rounded-md"
          />
        </el-form-item>

        <div class="flex items-center justify-between">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <el-button type="text" class="text-primary hover:text-primary-dark">
            忘记密码？
          </el-button>
        </div>

        <el-button
          type="primary"
          :loading="loading"
          class="w-full"
          @click="handleSubmit"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  email: '',
  password: ''
})

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const success = await userStore.login(formData)
        if (success) {
          ElMessage.success('登录成功')
          // 如果有重定向地址，则跳转到重定向地址
          const redirect = route.query.redirect as string
          router.push(redirect || '/')
        }
      } catch (error) {
        console.error('Login error:', error)
        ElMessage.error('登录失败，请检查邮箱和密码')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>
