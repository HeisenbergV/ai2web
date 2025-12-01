# AI to Web - Vue3 后台管理框架

一个基于 Vue3 + Pinia + Vue Router + Element Plus + Sass 的轻量级后台管理框架，提供完整的架构解决方案。

## 📚 开发文档

> **重要：** 使用 AI 助手开发时，请先阅读以下文档！

- 📖 [文档目录](./docs/README.md) - 所有文档的索引
- 🤖 [AI 系统提示词](./docs/AI_SYSTEM_PROMPT.md) - **新会话必读**，帮助 AI 快速理解项目架构
- 🚀 [快速上手指南](./docs/QUICK_START.md) - 5分钟快速理解项目结构
- 📝 [开发规范文档](./docs/DEVELOPMENT_GUIDE.md) - 详细的编码规范和最佳实践
- 💬 [AI 对话模板](./docs/AI_CONVERSATION_TEMPLATE.md) - 标准对话模板，提高沟通效率

## 🎯 核心架构功能

### 1. 动态路由系统
**核心特性：** 通过 JSON 配置自动生成路由，无需手动编写路由代码

- 📝 **JSON 配置驱动** - 菜单和路由通过 `menu.json` 统一配置
- 🔄 **自动路由注册** - 系统自动解析配置并动态注册路由
- 🌳 **多级菜单支持** - 支持无限层级的嵌套菜单结构
- 🎨 **图标自动映射** - 自动将字符串图标名称转换为 Element Plus 图标组件
- 🔐 **路由守卫集成** - 内置路由守卫确保动态路由正确加载

**工作原理：**
```javascript
// 1. 读取 menu.json 配置
// 2. 递归解析菜单结构
// 3. 自动调用 router.addRoute() 注册路由
// 4. 图标字符串自动转换为组件
```

### 2. 多种布局模式
**核心特性：** 三种布局模式，灵活适配不同业务场景

- 🏛️ **经典布局** - 顶部导航栏 + 左侧菜单栏 + 内容区
- ➡️ **水平布局** - 顶部水平菜单栏 + 内容区
- ⬇️ **垂直布局** - 左侧垂直菜单栏 + 顶部工具栏 + 内容区
- 💾 **状态持久化** - 布局选择自动保存到 localStorage
- 🔄 **实时切换** - 切换布局后立即生效，无需刷新

### 3. 主题系统
**核心特性：** 完整的亮色/暗色主题切换方案

- 🌞 **亮色主题** - 清爽明亮的视觉体验
- 🌙 **暗色主题** - 护眼的深色模式
- 🎨 **CSS 变量驱动** - 基于 Element Plus 的 CSS 变量系统
- 💾 **主题持久化** - 主题选择自动保存
- 🔄 **全局生效** - 切换主题后整个应用立即应用新主题

### 4. 国际化支持
**核心特性：** 多语言切换，轻松扩展新语言

- 🌍 **多语言支持** - 内置中文/英文，可扩展更多语言
- 🔄 **动态切换** - 切换语言后立即生效
- 💾 **语言持久化** - 语言选择自动保存
- 📦 **Element Plus 集成** - 与 Element Plus 国际化无缝集成

### 5. 统一请求封装
**核心特性：** 基于 Axios 的统一 API 请求处理

- 🔧 **请求拦截器** - 自动添加 token、统一处理请求头
- 📥 **响应拦截器** - 统一处理响应数据、错误提示
- 🎯 **方法封装** - 提供 get、post、put、delete 等便捷方法
- ⚙️ **统一配置** - 基础 URL、超时时间等统一管理
- 🚨 **错误处理** - 统一的错误处理和用户提示

### 6. 公共组件系统
**核心特性：** 可复用的业务组件，提高开发效率

- 📊 **CommonTable** - 内置分页的表格组件
- 🔄 **事件驱动** - 提供页码变化、每页条数变化等事件
- 🎨 **样式统一** - 统一的表格样式和交互体验
- 🔌 **灵活扩展** - 支持 Element Plus Table 的所有属性

### 7. 样式系统
**核心特性：** Sass 预处理器 + 通用样式 Mixin

- 🎨 **Sass 支持** - 完整的 Sass/SCSS 预处理器支持
- 📦 **通用 Mixin** - 提供 `demo-section`、`code-block` 等通用样式
- 🎯 **样式复用** - 通过 Mixin 统一管理重复样式
- 🌈 **主题变量** - 统一的颜色、间距、字体等设计变量
- 📐 **响应式设计** - 支持移动端适配

### 8. 状态管理
**核心特性：** 基于 Pinia 的集中式状态管理

- 🗂️ **应用状态** - 主题、布局、国际化、侧边栏状态统一管理
- 📋 **菜单状态** - 菜单列表、路由注册状态管理
- 💾 **持久化** - 关键状态自动保存到 localStorage
- 🔄 **响应式** - 基于 Vue3 响应式系统，状态变化自动更新 UI

## ✨ 特性列表

- ✅ **Vue3** - 使用最新的 Composition API
- ✅ **Pinia** - 轻量级状态管理
- ✅ **Vue Router** - 路由管理，支持动态路由
- ✅ **Element Plus** - 企业级 UI 组件库
- ✅ **Sass** - CSS 预处理器
- ✅ **Vite** - 极速构建工具
- ✅ **主题设置** - 支持亮色/暗色主题切换
- ✅ **国际化** - 支持多语言（中文/英文）
- ✅ **全屏功能** - 一键全屏
- ✅ **多种布局** - 经典布局、水平布局、垂直布局
- ✅ **动态菜单** - 通过 JSON 配置菜单
- ✅ **请求封装** - 统一的 API 请求处理
- ✅ **公共组件** - Table、分页等组件化

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   └── CommonTable/    # 表格组件（含分页）
├── config/             # 配置文件
│   └── menu.json       # 菜单配置（核心：动态路由配置）
├── layouts/            # 布局组件
│   ├── index.vue       # 布局入口
│   └── components/     # 布局子组件
│       ├── ClassicLayout.vue    # 经典布局
│       ├── HorizontalLayout.vue # 水平布局
│       ├── VerticalLayout.vue   # 垂直布局
│       ├── Sidebar.vue          # 侧边栏
│       ├── HeaderTools.vue       # 顶部工具栏
│       └── ...
├── router/             # 路由配置
│   └── index.js        # 路由入口（包含动态路由守卫）
├── stores/             # Pinia 状态管理
│   ├── app.js         # 应用状态（主题、布局、国际化）
│   └── menu.js        # 菜单状态（核心：动态路由注册）
├── styles/             # 样式文件
│   ├── index.scss      # 全局样式
│   └── common.scss     # 通用样式 Mixin
├── utils/              # 工具函数
│   ├── request.js     # 请求封装（核心：统一 API 处理）
│   ├── fullscreen.js  # 全屏功能
│   └── menu.js        # 菜单工具
└── views/              # 页面组件
    ├── Login.vue      # 登录页
    ├── Dashboard.vue  # 仪表盘
    └── ...
```

## 📝 核心功能使用指南

### 1. 动态路由配置

菜单通过 `src/config/menu.json` 文件配置，支持多级菜单：

```json
[
  {
    "path": "/dashboard",
    "name": "Dashboard",
    "title": "仪表盘",
    "icon": "Odometer",
    "component": "Dashboard"
  },
  {
    "path": "/features",
    "name": "Features",
    "title": "特性演示",
    "icon": "StarFilled",
    "children": [
      {
        "path": "/theme",
        "name": "ThemeDemo",
        "title": "主题设置",
        "icon": "Sunny",
        "component": "ThemeDemo"
      }
    ]
  }
]
```

**字段说明：**
- `path`: 路由路径（支持绝对路径和相对路径）
- `name`: 路由名称（需唯一）
- `title`: 菜单显示名称
- `icon`: Element Plus 图标名称（自动转换为组件）
- `component`: 组件文件名（位于 `src/views/` 目录）
- `children`: 子菜单（可选，支持无限层级）

**工作原理：**
1. 应用启动时，`menu.js` 读取 `menu.json` 配置
2. `menu.js` 递归解析菜单结构，将图标字符串转换为组件
3. `menu.js` 调用 `router.addRoute()` 动态注册路由
4. 路由守卫确保动态路由在页面加载前完成注册

### 2. 布局切换

在顶部工具栏点击布局切换按钮，或通过代码切换：

```javascript
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 切换到经典布局
appStore.setLayout('classic')

// 切换到水平布局
appStore.setLayout('horizontal')

// 切换到垂直布局
appStore.setLayout('vertical')
```

### 3. 主题切换

```javascript
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 切换到亮色主题
appStore.setTheme('light')

// 切换到暗色主题
appStore.setTheme('dark')
```

### 4. 国际化切换

```javascript
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 切换到中文
appStore.setLocale('zh-cn')

// 切换到英文
appStore.setLocale('en')
```

### 5. 使用公共 Table 组件

```vue
<template>
  <CommonTable
    :table-data="tableData"
    :total="total"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
  >
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="姓名" />
  </CommonTable>
</template>

<script setup>
import { ref } from 'vue'
import CommonTable from '@/components/CommonTable/index.vue'

const tableData = ref([])
const total = ref(0)

const handlePageChange = ({ page, size }) => {
  // 处理页码变化
  console.log('页码:', page, '每页条数:', size)
}

const handleSizeChange = ({ page, size }) => {
  // 处理每页条数变化
  console.log('页码:', page, '每页条数:', size)
}
</script>
```

### 6. API 请求

使用封装的请求工具：

```javascript
import request from '@/utils/request'

// GET 请求
request.get('/api/users')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })

// POST 请求
request.post('/api/users', { 
  name: 'John',
  email: 'john@example.com'
})
  .then(res => {
    console.log(res)
  })

// PUT 请求
request.put('/api/users/1', { name: 'Updated' })

// DELETE 请求
request.delete('/api/users/1')
```

**请求拦截器自动处理：**
- 自动添加 `Authorization` token
- 统一处理请求头
- 统一处理错误响应

### 7. 使用通用样式 Mixin

```scss
<style scoped lang="scss">
@import '@/styles/common.scss';

.my-page {
  .demo-section {
    @include demo-section;  // 使用通用样式
  }
  
  pre {
    @include code-block;   // 使用代码块样式
  }
}
</style>
```

## 🏗️ 架构设计

### 核心设计理念

1. **配置驱动** - 通过 JSON 配置驱动路由和菜单，减少代码编写
2. **组件化** - 高度组件化，提高代码复用性
3. **状态集中管理** - 使用 Pinia 集中管理应用状态
4. **样式统一** - 通过 Sass Mixin 统一管理样式
5. **类型安全** - 虽然使用 JavaScript，但代码结构清晰，易于维护

### 数据流

```
menu.json (配置)
    ↓
menu.js (解析配置)
    ↓
menu.js (动态注册路由)
    ↓
router.addRoute() (Vue Router)
    ↓
Sidebar/Menu (渲染菜单)
    ↓
用户点击菜单
    ↓
路由跳转
    ↓
views/*.vue (渲染页面)
```

### 状态管理流程

```
用户操作（切换主题/布局/语言）
    ↓
app.js (Pinia Store)
    ↓
更新状态 + localStorage
    ↓
响应式更新 UI
```

## 🛠️ 技术栈

- **Vue** 3.4+ - 渐进式 JavaScript 框架
- **Pinia** 2.1+ - Vue 官方状态管理库
- **Vue Router** 4.2+ - Vue 官方路由管理器
- **Element Plus** 2.5+ - 基于 Vue 3 的组件库
- **Vite** 5.0+ - 下一代前端构建工具
- **Sass** 1.69+ - CSS 预处理器
- **Axios** 1.6+ - 基于 Promise 的 HTTP 客户端

## 📄 许可证

MIT
