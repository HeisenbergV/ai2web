# AI 系统提示词 - AI to Web 框架

> **重要提示：** 这是给AI助手的系统提示词，帮助AI快速理解项目架构和开发规范。每次新会话开始时，请先阅读此文档。

## 📋 项目概述

**AI to Web** 是一个基于 Vue3 + Pinia + Vue Router + Element Plus + Sass 的轻量级后台管理框架。

### 核心设计理念

1. **配置驱动** - 通过 JSON 配置驱动路由和菜单，减少代码编写
2. **组件化** - 高度组件化，提高代码复用性
3. **状态集中管理** - 使用 Pinia 集中管理应用状态
4. **样式统一** - 通过 Sass Mixin 统一管理样式
5. **类型安全** - 代码结构清晰，易于维护

## 🏗️ 技术栈

- **Vue 3.4+** - 使用 Composition API (`<script setup>`)
- **Pinia 2.1+** - 状态管理（不使用 Vuex）
- **Vue Router 4.2+** - 路由管理，支持动态路由
- **Element Plus 2.5+** - UI 组件库
- **Vite 5.0+** - 构建工具
- **Sass 1.69+** - CSS 预处理器
- **Axios 1.6+** - HTTP 客户端

## 📁 项目结构（必须遵守）

```
src/
├── components/          # 公共组件（可复用组件）
│   └── CommonTable/    # 表格组件（含分页）
├── config/             # 配置文件
│   └── menu.json       # 菜单配置（核心：动态路由配置）
├── layouts/            # 布局组件
│   ├── index.vue       # 布局入口
│   └── components/     # 布局子组件
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
└── views/              # 页面组件（业务页面）
    ├── Login.vue      # 登录页
    ├── Dashboard.vue  # 仪表盘
    └── ...
```

## 🎯 核心功能理解

### 1. 动态路由系统（最重要）

**工作原理：**
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
```

**关键文件：**
- `src/config/menu.json` - 菜单配置（JSON格式）
- `src/stores/menu.js` - 菜单状态管理，负责动态路由注册
- `src/router/index.js` - 路由守卫确保动态路由加载

**添加新页面步骤：**
1. 在 `src/views/` 创建 Vue 组件
2. 在 `src/config/menu.json` 添加菜单配置
3. 系统自动注册路由，无需手动修改 `router/index.js`

### 2. 状态管理（Pinia）

**应用状态 (`stores/app.js`)：**
- `theme` - 主题（light/dark）
- `locale` - 国际化（zh-cn/en）
- `layout` - 布局模式（classic/horizontal/vertical）
- `sidebarCollapse` - 侧边栏折叠状态

**菜单状态 (`stores/menu.js`)：**
- `menuList` - 菜单列表
- `loadMenu()` - 加载菜单并注册路由

### 3. 请求封装

**文件：** `src/utils/request.js`

**特性：**
- 自动添加 `Authorization` token
- 统一错误处理
- 统一响应格式处理

**使用方式：**
```javascript
import request from '@/utils/request'

// GET 请求
request.get('/api/users')

// POST 请求
request.post('/api/users', { name: 'John' })
```

### 4. 公共组件

**CommonTable 组件：**
- 位置：`src/components/CommonTable/index.vue`
- 功能：内置分页的表格组件
- 使用：通过插槽传入表格列

## 📝 编码规范（必须遵守）

### 1. Vue 组件规范

**使用 Composition API：**
```vue
<script setup>
// ✅ 正确：使用 <script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

**组件命名：**
- 组件文件：PascalCase（如 `UserList.vue`）
- 组件导入：PascalCase（如 `import UserList from '@/views/UserList.vue'`）

### 2. 样式规范

**使用 Sass：**
```vue
<style scoped lang="scss">
// ✅ 正确：使用 scoped 和 lang="scss"
.my-component {
  color: var(--el-text-color-primary);
}
</style>
```

**使用通用 Mixin：**
```scss
@import '@/styles/common.scss';

.demo-section {
  @include demo-section;  // 使用通用样式
}
```

### 3. 路由配置规范

**不要手动修改 `router/index.js`！**

**正确方式：**
1. 在 `src/config/menu.json` 添加配置
2. 系统自动注册路由

**菜单配置格式：**
```json
{
  "path": "/users",
  "name": "UserList",
  "title": "用户列表",
  "icon": "User",
  "component": "UserList"
}
```

### 4. 状态管理规范

**使用 Pinia Store：**
```javascript
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
appStore.setTheme('dark')
```

**不要直接修改 localStorage！** 通过 Store 方法修改。

### 5. API 请求规范

**必须使用封装的 request：**
```javascript
// ✅ 正确
import request from '@/utils/request'
request.get('/api/users')

// ❌ 错误：不要直接使用 axios
import axios from 'axios'
```

### 6. 图标使用规范

**使用 Element Plus Icons：**
```vue
<script setup>
import { User } from '@element-plus/icons-vue'
</script>

<template>
  <el-icon><User /></el-icon>
</template>
```

**菜单配置中的图标：**
- 使用字符串名称（如 `"User"`）
- 系统自动转换为组件

## 🚨 常见错误避免

1. **不要手动修改 `router/index.js` 添加路由** - 使用 `menu.json` 配置
2. **不要直接使用 axios** - 使用 `@/utils/request`
3. **不要直接修改 localStorage** - 通过 Store 方法
4. **不要忘记使用 `scoped` 样式** - 避免样式污染
5. **不要忘记导入通用样式 Mixin** - 保持样式统一

## 🔍 开发流程

### 添加新功能页面

1. **创建页面组件**
   ```bash
   # 在 src/views/ 创建组件
   src/views/UserList.vue
   ```

2. **配置菜单**
   ```json
   // 在 src/config/menu.json 添加
   {
     "path": "/users",
     "name": "UserList",
     "title": "用户列表",
     "icon": "User",
     "component": "UserList"
   }
   ```

3. **完成！** 系统自动注册路由

### 添加新 Store

1. 在 `src/stores/` 创建文件
2. 使用 `defineStore` 定义
3. 使用 Composition API 风格

### 添加新公共组件

1. 在 `src/components/` 创建组件目录
2. 创建 `index.vue` 作为入口
3. 使用 `scoped` 样式

## 💡 AI 开发建议

1. **先理解需求** - 明确要做什么
2. **查看现有代码** - 参考类似功能的实现
3. **遵循规范** - 严格按照编码规范
4. **测试功能** - 确保功能正常工作
5. **保持一致性** - 与现有代码风格一致

## 📚 参考文档

- [Vue 3 文档](https://cn.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [项目 README](../README.md)

---

**记住：配置驱动、组件化、状态集中管理、样式统一！**

