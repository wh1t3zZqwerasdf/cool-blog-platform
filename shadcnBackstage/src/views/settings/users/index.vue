<!-- 用户管理页面 -->
<template>
  <div class="flex h-[calc(100vh-60px)] w-full flex-col bg-muted/40">
    <div class="flex h-full flex-col sm:gap-1 sm:py-4">
      <header
        class="sticky top-0 z-30 mb-2 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div class="relative w-full max-w-sm items-center">
          <Input id="search" type="text" placeholder="Search..." class="pl-10" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div class="flex items-center">
          <div class="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm" class="h-7 gap-1">
                  <ListFilter class="h-3.5 w-3.5" />
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    过滤
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem checked>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem>Draft</DropdownMenuItem>
                <DropdownMenuItem>
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" class="h-7 gap-1" @click="showAddDialog = true">
              <PlusCircle class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                添加人员
              </span>
            </Button>
          </div>
        </div>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs default-value="all">
          <TabsContent value="all">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="hidden w-[100px] sm:table-cell">
                        <span class="sr-only">头像</span>
                      </TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>角色</TableHead>
                      <TableHead class="hidden md:table-cell">
                        邮箱
                      </TableHead>
                      <TableHead class="hidden md:table-cell">
                        创建时间
                      </TableHead>
                      <TableHead>
                        <span>操作</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="item in usersData" :key="item.id">
                      <TableCell class="hidden sm:table-cell">
                        <img src="@/assets/images/ox.png" alt="image" class="aspect-square rounded-md object-cover"
                          height="64" width="64" />
                      </TableCell>
                      <TableCell class="font-medium">{{ item.username }}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{{ item.role }}</Badge>
                      </TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.email }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.createdAt }}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger as-child>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal class="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>编辑</DropdownMenuItem>
                            <DropdownMenuItem>删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="w-full flex justify-end">
                  <Pagination 
                    v-model:page="PageData.page"
                    :total="PageData.total" 
                    :page-size="PageData.pageSize"
                    :sibling-count="1" 
                    show-edges
                  >
                    <PaginationList class="flex items-center gap-1">
                      <PaginationFirst />
                      <PaginationPrev />
                      <PaginationListItem 
                        v-for="page in Math.ceil(PageData.total / PageData.pageSize)" 
                        :key="page" 
                        :value="page" 
                        as-child
                      >
                        <Button 
                          class="w-10 h-10 p-0" 
                          :variant="page === PageData.page ? 'default' : 'outline'"
                        >
                          {{ page }}
                        </Button>
                      </PaginationListItem>
                      <PaginationNext />
                      <PaginationLast />
                    </PaginationList>
                  </Pagination>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>

  <!-- 添加用户弹窗 -->
  <Dialog :open="showAddDialog" @update:open="showAddDialog = false">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>添加用户</DialogTitle>
        <DialogDescription>
          请填写新用户的信息。所有字段都是必填的。
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input type="text" placeholder="请输入用户名" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="请输入邮箱" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="请输入密码" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" @click="showAddDialog = false">取消</Button>
          <Button type="submit">确定</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CircleUser,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-vue-next'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { ref, onMounted, reactive, watch } from 'vue'
import { useMessage } from '@/hooks'
import { userApi, type User } from '@/api/user'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const message = useMessage()
const usersData = ref<User[]>([])
const PageData = reactive({
  total: 0,
  page: 1,
  pageSize: 6
})
const showAddDialog = ref(false)

// 表单验证规则
const formSchema = toTypedSchema(z.object({
  username: z.string()
    .min(2, '用户名至少需要3个字符')
    .max(50, '用户名最多50个字符'),
  email: z.string()
    .email('请输入有效的邮箱地址'),
  password: z.string()
    .min(6, '密码至少需要6个字符')
}))

// 初始值
const initialValues = {
  username: '',
  email: '',
  password: 'admin123'
}

// 使用 useForm
const form = useForm({
  validationSchema: formSchema,
  initialValues
})

// 提交表单
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { data, success } = await userApi.register(values)
    if (success) {
      message.success('用户创建成功')
      showAddDialog.value = false
      // 刷新用户列表
      fetchUsers()
    }
  } catch (error) {
    message.error('创建用户失败')
  }
})

// 获取用户列表
const fetchUsers = async () => {
  try {
    const params = {
      page: PageData.page,
      pageSize: PageData.pageSize
    }
    console.log('请求参数:', params)
    const { data, success } = await userApi.getUsers(params)
    console.log('API响应:', { data, success })
    if (success) {
      usersData.value = data.list
      PageData.total = data.total
      console.log('更新后的PageData:', { ...PageData })
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    message.error('获取用户列表失败')
  }
}

// 监听分页数据变化
watch(
  () => PageData.page,
  (newPage) => {
    if (newPage) {
      fetchUsers()
    }
  },
  { immediate: true }
)

onMounted(() => {
  console.log('组件挂载，初始化获取数据')
})
</script>
