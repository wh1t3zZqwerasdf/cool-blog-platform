<script setup lang=ts>
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStoreHook } from '@/stores/user'
import { useMessage } from '@/hooks/useMessage'
import ChartCard from './components/ChartCard.vue'

// 这是示例数据
const data = {
  user: {
    name: '管理员',
    email: 'admin@example.com',
    avatar: '/avatars/admin.jpg',
  },
  teams: [
    {
      name: '博客系统',
      logo: GalleryVerticalEnd,
      plan: '企业版',
    },
    {
      name: '内容管理',
      logo: AudioWaveform,
      plan: '标准版',
    },
    {
      name: '用户中心',
      logo: Command,
      plan: '免费版',
    },
  ],
  navMain: [
    {
      title: '工作台',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: '历史记录',
          url: '#',
        },
        {
          title: '收藏夹',
          url: '#',
        },
        {
          title: '设置',
          url: '#',
        },
      ],
    },
    {
      title: '内容管理',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '文章管理',
          url: '#',
        },
        {
          title: '分类管理',
          url: '#',
        },
        {
          title: '标签管理',
          url: '#',
        },
      ],
    },
    {
      title: '系统文档',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: '介绍',
          url: '#',
        },
        {
          title: '快速开始',
          url: '#',
        },
        {
          title: '使用教程',
          url: '#',
        },
        {
          title: '更新日志',
          url: '#',
        },
      ],
    },
    {
      title: '系统设置',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: '基本设置',
          url: '#',
        },
        {
          title: '团队管理',
          url: '#',
        },
        {
          title: '账单中心',
          url: '#',
        },
        {
          title: '权限设置',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: '设计工程',
      url: '#',
      icon: Frame,
    },
    {
      name: '营销中心',
      url: '#',
      icon: PieChart,
    },
    {
      name: '数据分析',
      url: '#',
      icon: Map,
    },
  ],
}

const activeTeam = ref(data.teams[0])
const router = useRouter()
const userStore = useUserStoreHook()
const message = useMessage()

async function handleLogout() {
  try {
    await userStore.logout()
    message.success('退出成功，您已安全退出系统')
    router.push('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
    message.error('退出失败，退出登录时发生错误，请重试')
  }
}

function setActiveTeam(team: typeof data.teams[number]) {
  activeTeam.value = team
}
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <component :is="activeTeam.logo" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ activeTeam.name }}</span>
                    <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                :side-offset="4"
              >
                <DropdownMenuLabel class="text-xs text-muted-foreground">
                  团队
                </DropdownMenuLabel>
                <DropdownMenuItem
                  v-for="(team, index) in data.teams"
                  :key="team.name"
                  class="gap-2 p-2"
                  @click="setActiveTeam(team)"
                >
                  <div class="flex size-6 items-center justify-center rounded-sm border">
                    <component :is="team.logo" class="size-4 shrink-0" />
                  </div>
                  {{ team.name }}
                  <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2">
                  <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus class="size-4" />
                  </div>
                  <div class="font-medium text-muted-foreground">
                    添加团队
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>平台</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              v-for="item in data.navMain"
              :key="item.title"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child>
                        <a :href="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>项目</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in data.projects"
              :key="item.name"
            >
              <SidebarMenuButton as-child>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuAction show-on-hover>
                    <MoreHorizontal />
                    <span class="sr-only">更多</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-48 rounded-lg" side="bottom" align="end">
                  <DropdownMenuItem>
                    <Folder class="text-muted-foreground" />
                    <span>查看项目</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward class="text-muted-foreground" />
                    <span>分享项目</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 class="text-muted-foreground" />
                    <span>删除项目</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton class="text-sidebar-foreground/70">
                <MoreHorizontal class="text-sidebar-foreground/70" />
                <span>更多</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                    <AvatarFallback class="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ data.user.name }}</span>
                    <span class="truncate text-xs">{{ data.user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <AvatarFallback class="rounded-lg">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data.user.name }}</span>
                      <span class="truncate text-xs">{{ data.user.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    升级到专业版
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    账户
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    账单
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    通知
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleLogout">
                  <LogOut />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="flex flex-col gap-4 p-4">
        <div class="flex items-center gap-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  构建您的应用程序
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>数据获取</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="flex-1 bg-muted/50 rounded-xl">
          
        </div>
        <!-- 上半部分：卡片网格 -->
        <div class="grid auto-rows-min gap-4 md:grid-cols-4">
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <!-- 下半部分：分成左右两栏 -->
        <div class="flex h-[500px] gap-4 md:min-h-min">
          <div class="flex-1 bg-muted/50 rounded-xl">
            <ChartCard  class="h-full p-2"/>
          </div>
          <div class="flex-1 bg-muted/50 rounded-xl">
            <!-- Right side is empty -->
          </div>
        </div>
    
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>