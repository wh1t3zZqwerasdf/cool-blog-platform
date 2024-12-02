<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStoreHook } from '@/stores/user'

interface LoginForm {
  email: string
  password: string
}

interface FormState {
  loading: boolean
  errors: {
    email?: string
    password?: string
    general?: string
  }
}

const router = useRouter()
const userStore = useUserStoreHook()

const formData = reactive<LoginForm>({
  email: 'cocounts0001@outlook.com',
  password: 'admin123'
})

const formState = reactive<FormState>({
  loading: false,
  errors: {}
})

async function handleLogin() {
  // 重置错误
  formState.errors = {}

  // 表单验证
  if (!formData.email) {
    formState.errors.email = '请输入邮箱'
    return
  }
  if (!formData.password) {
    formState.errors.password = '请输入密码'
    return
  }

  formState.loading = true
  try {
    const success = await userStore.login(formData)
    if (success) {
      router.push('/dashboard')
    } else {
      formState.errors.general = '登录失败，请检查邮箱和密码'
    }
  } catch (error) {
    formState.errors.general = '登录过程中发生错误'
    console.error('登录错误:', error)
  } finally {
    formState.loading = false
  }
}
</script>

<template>
  <div class="flex h-screen min-h-full flex-col justify-center">
    <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div class="flex items-center justify-center py-12">
        <div class="mx-auto grid w-[350px] gap-6">
          <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">
              登录
            </h1>
            <p class="text-balance text-muted-foreground">
              请输入您的邮箱和密码登录系统
            </p>
          </div>
          <form @submit.prevent="handleLogin" class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">邮箱</Label>
              <Input 
                id="email" 
                v-model="formData.email"
                type="email" 
                placeholder="your@email.com" 
                :class="{ 'border-red-500': formState.errors.email }"
                required 
              />
              <span v-if="formState.errors.email" class="text-sm text-red-500">
                {{ formState.errors.email }}
              </span>
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">密码</Label>
                <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                  忘记密码？
                </a>
              </div>
              <Input 
                id="password" 
                v-model="formData.password"
                type="password"
                :class="{ 'border-red-500': formState.errors.password }"
                required 
              />
              <span v-if="formState.errors.password" class="text-sm text-red-500">
                {{ formState.errors.password }}
              </span>
            </div>
            <span v-if="formState.errors.general" class="text-sm text-red-500 text-center">
              {{ formState.errors.general }}
            </span>
            <Button 
              type="submit" 
              class="w-full"
              :disabled="formState.loading"
            >
              {{ formState.loading ? '登录中...' : '登录' }}
            </Button>
            <Button variant="outline" class="w-full" :disabled="formState.loading">
              使用 Google 登录
            </Button>
          </form>
          <div class="mt-4 text-center text-sm">
            还没有账号？
            <a href="#" class="underline">
              立即注册
            </a>
          </div>
        </div>
      </div>
      <div class="hidden lg:block bg-muted h-screen">
        <img src="@/assets/images/prompthero.webp" alt="Image"
          class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
      </div>
    </div>
  </div>
</template>
