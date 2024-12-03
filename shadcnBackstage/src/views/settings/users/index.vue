<!-- 用户管理页面 -->
<template>
<div>1</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMessage } from '@/hooks'
import { userApi, type User } from '@/api/user'

const message = useMessage()
const users = ref<User[]>([])
const total = ref(0)

// 获取用户列表
const fetchUsers = async () => {
  try {
    const { data, success } = await userApi.getUsers()
    if (success) {
      users.value = data.list
      total.value = data.total
      console.log('获取用户列表成功:', data)
    }
  } catch (error) {
    console.error('获取用户列表错误:', error)
    message.error('获取用户列表失败')
  }
}


onMounted(() => {
  fetchUsers()
})
</script>
