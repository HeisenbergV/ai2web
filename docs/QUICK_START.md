# 快速上手指南 - AI to Web

> 本文档帮助AI快速理解项目结构和核心概念，适用于新会话开始时的快速参考。

## 🚀 5分钟快速理解

### 核心概念

1. **配置驱动路由** - 通过 `menu.json` 配置菜单和路由，无需手动编写路由代码
2. **动态路由注册** - 系统自动解析配置并注册路由
3. **组件化开发** - 高度组件化，提高复用性
4. **状态集中管理** - 使用 Pinia 管理应用状态

### 技术栈速查

- **Vue 3** - Composition API (`<script setup>`)
- **Pinia** - 状态管理
- **Vue Router** - 路由管理（动态路由）
- **Element Plus** - UI 组件库
- **Sass** - CSS 预处理器
- **Vite** - 构建工具
- **Axios** - HTTP 客户端（已封装）

## 📁 关键文件速查

### 配置文件

| 文件 | 作用 | 修改频率 |
|------|------|----------|
| `src/config/menu.json` | 菜单和路由配置 | ⭐⭐⭐ 经常 |
| `src/router/index.js` | 路由入口（不要手动修改） | ❌ 不修改 |
| `vite.config.js` | Vite 配置 | ⭐ 很少 |

### 状态管理

| 文件 | 作用 |
|------|------|
| `src/stores/app.js` | 应用状态（主题、布局、国际化） |
| `src/stores/menu.js` | 菜单状态（动态路由注册） |

### 工具函数

| 文件 | 作用 |
|------|------|
| `src/utils/request.js` | API 请求封装（必须使用） |
| `src/utils/menu.js` | 菜单工具函数 |
| `src/utils/fullscreen.js` | 全屏功能 |

### 公共组件

| 组件 | 位置 | 作用 |
|------|------|------|
| `CommonTable` | `src/components/CommonTable/` | 带分页的表格组件 |

## 🎯 常见任务快速参考

### 1. 添加新页面

**步骤：**

1. **创建页面组件**
   ```bash
   # 文件：src/views/UserList.vue
   ```

2. **配置菜单**
   ```json
   // 文件：src/config/menu.json
   {
     "path": "/users",
     "name": "UserList",
     "title": "用户列表",
     "icon": "User",
     "component": "UserList"
   }
   ```

3. **完成！** 系统自动注册路由

### 2. 使用 API 请求

```javascript
import request from '@/utils/request'

// GET
const res = await request.get('/api/users')

// POST
const res = await request.post('/api/users', { name: 'John' })
```

### 3. 使用状态管理

```javascript
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 读取状态
const theme = appStore.theme

// 修改状态
appStore.setTheme('dark')
```

### 4. 使用公共表格组件

```vue
<template>
  <CommonTable
    :table-data="tableData"
    :total="total"
    @page-change="handlePageChange"
  >
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="姓名" />
  </CommonTable>
</template>

<script setup>
import CommonTable from '@/components/CommonTable/index.vue'
</script>
```

## 🔍 项目结构速查

```
src/
├── components/          # 公共组件
│   └── CommonTable/     # 表格组件
├── config/              # 配置
│   └── menu.json        # ⭐ 菜单配置（核心）
├── layouts/             # 布局组件
├── router/              # 路由（不要手动修改）
├── stores/              # 状态管理
│   ├── app.js          # 应用状态
│   └── menu.js         # 菜单状态
├── styles/              # 样式
│   ├── index.scss      # 全局样式
│   └── common.scss     # 通用 Mixin
├── utils/               # 工具函数
│   ├── request.js      # ⭐ API 请求（必须使用）
│   └── menu.js         # 菜单工具
└── views/               # 页面组件
    └── *.vue           # 业务页面
```

## ⚠️ 重要规则

### ✅ 必须做的

1. **使用 `<script setup>`** - 所有组件使用 Composition API
2. **通过 `menu.json` 配置路由** - 不要手动修改 `router/index.js`
3. **使用 `@/utils/request`** - 不要直接使用 axios
4. **使用 `scoped` 样式** - 避免样式污染
5. **通过 Store 修改状态** - 不要直接修改 localStorage

### ❌ 禁止做的

1. **不要手动修改 `router/index.js`** - 使用 `menu.json` 配置
2. **不要直接使用 axios** - 使用 `@/utils/request`
3. **不要直接修改 localStorage** - 通过 Store 方法
4. **不要使用 Options API** - 使用 Composition API
5. **不要忘记 `scoped`** - 样式必须使用 scoped

## 📝 代码模板

### 页面组件模板

```vue
<template>
  <div class="page-name">
    <el-card>
      <template #header>
        <span>页面标题</span>
      </template>
      <!-- 页面内容 -->
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

// 状态
const data = ref([])

// 方法
const loadData = async () => {
  const res = await request.get('/api/data')
  data.value = res.data
}

// 生命周期
onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.page-name {
  // 样式
}
</style>
```

### 菜单配置模板

```json
{
  "path": "/path",
  "name": "ComponentName",
  "title": "菜单标题",
  "icon": "IconName",
  "component": "ComponentName"
}
```

## 🔗 相关文档

- [AI 系统提示词](./AI_SYSTEM_PROMPT.md) - 详细架构说明
- [开发规范](./DEVELOPMENT_GUIDE.md) - 编码规范
- [项目 README](../README.md) - 项目文档

---

**快速上手，高效开发！**


