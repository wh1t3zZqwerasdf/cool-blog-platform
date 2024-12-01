# Cool Blog

一个使用 Node.js、Vue3 和 MongoDB 构建的现代化博客系统。

## 项目结构

```tree
├── server/           # 后端 API 服务
│   ├── src/         # 源代码
│   └── package.json # 后端依赖
├── admin/           # 后台管理系统 (Vue3 + TypeScript)
└── blog/           # 前端博客 (开发中 - Nuxt.js)
```

## 技术栈

### 后端

- Node.js + Express
- MongoDB + Mongoose
- JWT 身份认证
- Swagger API 文档

### 后台管理系统

- Vue 3
- TypeScript
- Element Plus
- TailwindCSS
- Markdown 编辑器

### 前端博客 (开发中)

- Nuxt.js
- SSR 服务端渲染 (搜索引擎优化)
- 响应式设计

## 功能特性

- [x] 用户认证
- [x] 文章管理
- [x] 分类和标签
- [ ] 后台管理界面
- [ ] 前端博客展示
- [ ] 评论系统
- [ ] 搜索功能

## 开始使用

### 环境要求

- Node.js
- MongoDB
- npm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone [仓库地址]
cd cool-blog
```

2. 安装后端依赖

```bash
cd server
npm install
```

3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填写您的配置
```

4. 启动服务器

```bash
npm run start
```

## API 文档

服务器运行后，可以在 `/api-docs` 路径访问 API 文档。

## 开发计划

1. 后台管理系统
   - [ ] 用户登录和权限管理
   - [ ] 文章编辑器（支持 Markdown）
   - [ ] 文章管理（增删改查）
   - [ ] 分类和标签管理
   - [ ] 响应式设计

2. 前端博客
   - [ ] 首页文章列表
   - [ ] 文章详情页
   - [ ] 分类和标签页
   - [ ] 评论系统
   - [ ] 搜索功能

## 许可证

MIT
