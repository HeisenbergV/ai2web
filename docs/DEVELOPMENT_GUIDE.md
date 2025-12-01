# 开发规范文档 - AI to Web

> 本文档定义了项目的编码规范、组件开发规范、命名规范等，所有代码必须遵循此规范。

## 📋 目录

1. [编码规范](#编码规范)
2. [组件开发规范](#组件开发规范)
3. [路由和菜单规范](#路由和菜单规范)
4. [状态管理规范](#状态管理规范)
5. [样式规范](#样式规范)
6. [API 请求规范](#api-请求规范)
7. [命名规范](#命名规范)
8. [代码组织规范](#代码组织规范)

---

## 编码规范

### 1. Vue 组件规范

#### 1.1 使用 Composition API

**必须使用 `<script setup>` 语法：**

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ✅ 正确
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

**禁止使用 Options API：**

```vue
<script>
// ❌ 错误：不要使用 Options API
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>
```

#### 1.2 组件结构顺序

**标准组件结构：**

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 1. 导入 Vue 相关
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 2. 导入组件
import CommonTable from '@/components/CommonTable/index.vue'

// 3. 导入工具函数
import request from '@/utils/request'

// 4. 导入 Store
import { useAppStore } from '@/stores/app'

// 5. 定义 Props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

// 6. 定义 Emits
const emit = defineEmits(['change', 'update'])

// 7. 定义响应式数据
const count = ref(0)

// 8. 定义计算属性
const doubleCount = computed(() => count.value * 2)

// 9. 定义方法
const handleClick = () => {
  count.value++
  emit('change', count.value)
}

// 10. 生命周期钩子
onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped lang="scss">
// 样式内容
</style>
```

#### 1.3 Props 定义规范

**使用 TypeScript 风格的类型定义：**

```javascript
// ✅ 正确：详细定义 Props
const props = defineProps({
  // 字符串类型，必填
  title: {
    type: String,
    required: true
  },
  // 数字类型，可选，有默认值
  count: {
    type: Number,
    default: 0
  },
  // 数组类型，可选
  items: {
    type: Array,
    default: () => []
  },
  // 对象类型，可选
  config: {
    type: Object,
    default: () => ({})
  }
})
```

#### 1.4 Emits 定义规范

**明确声明所有事件：**

```javascript
// ✅ 正确：明确声明事件
const emit = defineEmits(['change', 'update', 'delete'])

// 使用
emit('change', value)
```

---

## 组件开发规范

### 1. 页面组件（views）

**位置：** `src/views/`

**命名：** PascalCase（如 `UserList.vue`）

**规范：**
- 每个页面组件对应一个路由
- 组件名与文件名一致
- 使用 `scoped` 样式

**示例：**

```vue
<template>
  <div class="user-list">
    <el-card>
      <template #header>
        <span>用户列表</span>
      </template>
      <CommonTable
        :table-data="tableData"
        :total="total"
        @page-change="handlePageChange"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="姓名" />
      </CommonTable>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonTable from '@/components/CommonTable/index.vue'
import request from '@/utils/request'

const tableData = ref([])
const total = ref(0)

const loadData = async () => {
  const res = await request.get('/api/users')
  tableData.value = res.data
  total.value = res.total
}

const handlePageChange = ({ page, size }) => {
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.user-list {
  // 样式
}
</style>
```

### 2. 公共组件（components）

**位置：** `src/components/`

**命名：** PascalCase 目录名，包含 `index.vue`

**规范：**
- 每个组件一个目录
- 目录名与组件名一致
- 入口文件为 `index.vue`
- 可复用，不包含业务逻辑

**示例结构：**

```
src/components/
└── CommonTable/
    ├── index.vue      # 组件入口
    └── types.js       # 类型定义（可选）
```

**组件示例：**

```vue
<template>
  <div class="common-table">
    <el-table :data="tableData" v-bind="$attrs">
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :total="total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  showPagination: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['page-change'])

const handlePageChange = (page) => {
  emit('page-change', { page })
}
</script>

<style scoped lang="scss">
.common-table {
  // 样式
}
</style>
```

### 3. 布局组件（layouts）

**位置：** `src/layouts/`

**规范：**
- 布局组件不包含业务逻辑
- 通过插槽提供内容区域
- 响应式设计

---

## 路由和菜单规范

### 1. 路由配置（禁止手动修改）

**重要：** 不要手动修改 `src/router/index.js` 添加路由！

**正确方式：** 通过 `src/config/menu.json` 配置

### 2. 菜单配置规范

**文件：** `src/config/menu.json`

**配置格式：**

```json
{
  "path": "/users",           // 路由路径（必填）
  "name": "UserList",         // 路由名称（必填，唯一）
  "title": "用户列表",        // 菜单显示名称（必填）
  "icon": "User",             // Element Plus 图标名称（可选）
  "component": "UserList",    // 组件文件名（必填，不含 .vue）
  "hidden": false,            // 是否隐藏（可选，默认 false）
  "children": []              // 子菜单（可选）
}
```

**字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `path` | String | ✅ | 路由路径，支持绝对路径（以 `/` 开头）和相对路径 |
| `name` | String | ✅ | 路由名称，必须唯一 |
| `title` | String | ✅ | 菜单显示名称 |
| `icon` | String | ❌ | Element Plus 图标名称，参考 [Element Plus Icons](https://element-plus.org/zh-CN/component/icon.html) |
| `component` | String | ✅ | 组件文件名（位于 `src/views/`），不含 `.vue` 扩展名 |
| `hidden` | Boolean | ❌ | 是否在菜单中隐藏，默认 `false` |
| `children` | Array | ❌ | 子菜单数组，支持无限层级 |

**示例：**

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
    "path": "/users",
    "name": "UserList",
    "title": "用户管理",
    "icon": "User",
    "children": [
      {
        "path": "/users/list",
        "name": "UserList",
        "title": "用户列表",
        "icon": "List",
        "component": "UserList"
      },
      {
        "path": "/users/add",
        "name": "UserAdd",
        "title": "添加用户",
        "icon": "Plus",
        "component": "UserAdd"
      }
    ]
  }
]
```

### 3. 添加新页面流程

1. **创建页面组件**
   ```bash
   # 在 src/views/ 创建
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

---

## 状态管理规范

### 1. Pinia Store 规范

**位置：** `src/stores/`

**命名：** camelCase（如 `app.js`、`menu.js`）

**规范：**
- 使用 Composition API 风格
- 使用 `defineStore` 定义
- Store 名使用 camelCase

**示例：**

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref(null)
  const token = ref('')

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 方法
  const setUserInfo = (info) => {
    userInfo.value = info
  }

  const setToken = (val) => {
    token.value = val
    localStorage.setItem('token', val)
  }

  const logout = () => {
    userInfo.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  // 初始化
  const init = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    setUserInfo,
    setToken,
    logout,
    init
  }
})
```

### 2. Store 使用规范

**在组件中使用：**

```javascript
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()

// 读取状态
const theme = appStore.theme

// 调用方法
appStore.setTheme('dark')
```

**不要直接修改状态：**

```javascript
// ❌ 错误：不要直接修改
appStore.theme = 'dark'

// ✅ 正确：通过方法修改
appStore.setTheme('dark')
```

### 3. 持久化规范

**需要持久化的状态：**
- 主题设置
- 布局模式
- 国际化设置
- 用户信息
- Token

**实现方式：**

```javascript
const setTheme = (val) => {
  theme.value = val
  localStorage.setItem('theme', val)  // 保存到 localStorage
}

const init = () => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  setTheme(savedTheme)
}
```

---

## 样式规范

### 1. 使用 Sass

**所有样式文件使用 Sass：**

```vue
<style scoped lang="scss">
// ✅ 正确
.my-component {
  color: var(--el-text-color-primary);
}
</style>
```

### 2. Scoped 样式

**页面组件和公共组件必须使用 `scoped`：**

```vue
<style scoped lang="scss">
// ✅ 正确：避免样式污染
</style>
```

**全局样式放在 `src/styles/index.scss`：**

```scss
// 全局样式，不使用 scoped
body {
  margin: 0;
  padding: 0;
}
```

### 3. 使用 CSS 变量

**优先使用 Element Plus 的 CSS 变量：**

```scss
.my-component {
  color: var(--el-text-color-primary);        // 主文本颜色
  background: var(--el-bg-color);             // 背景颜色
  border-color: var(--el-border-color);       // 边框颜色
}
```

### 4. 使用通用 Mixin

**导入通用样式 Mixin：**

```scss
@import '@/styles/common.scss';

.demo-section {
  @include demo-section;  // 使用通用样式
}

pre {
  @include code-block;   // 使用代码块样式
}
```

### 5. 响应式设计

**使用 Element Plus 的栅格系统：**

```vue
<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      <!-- 内容 -->
    </el-col>
  </el-row>
</template>
```

---

## API 请求规范

### 1. 使用封装的 request

**必须使用 `@/utils/request`：**

```javascript
// ✅ 正确
import request from '@/utils/request'

// GET 请求
const res = await request.get('/api/users')

// POST 请求
const res = await request.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
})

// PUT 请求
const res = await request.put('/api/users/1', {
  name: 'Updated'
})

// DELETE 请求
const res = await request.delete('/api/users/1')
```

**禁止直接使用 axios：**

```javascript
// ❌ 错误：不要直接使用 axios
import axios from 'axios'
axios.get('/api/users')
```

### 2. 错误处理

**request 已统一处理错误，无需额外处理：**

```javascript
// ✅ 正确：request 会自动显示错误提示
try {
  const res = await request.get('/api/users')
  // 处理成功响应
} catch (error) {
  // 错误已自动处理，这里可以做额外处理
  console.error(error)
}
```

### 3. Token 处理

**Token 自动添加，无需手动处理：**

```javascript
// Token 会自动从 localStorage 读取并添加到请求头
// 无需手动添加 Authorization
const res = await request.get('/api/users')
```

---

## 命名规范

### 1. 文件命名

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| Vue 组件 | PascalCase | `UserList.vue` |
| JavaScript 文件 | camelCase | `request.js`、`menu.js` |
| 样式文件 | kebab-case | `common.scss`、`index.scss` |
| 目录 | kebab-case | `common-table/`、`user-list/` |

### 2. 变量命名

**使用 camelCase：**

```javascript
// ✅ 正确
const userName = 'John'
const userList = []
const isLoading = false

// ❌ 错误
const user_name = 'John'
const UserList = []
```

### 3. 常量命名

**使用 UPPER_SNAKE_CASE：**

```javascript
// ✅ 正确
const API_BASE_URL = '/api'
const MAX_RETRY_COUNT = 3

// ❌ 错误
const apiBaseUrl = '/api'
```

### 4. 组件命名

**使用 PascalCase：**

```vue
<script setup>
// ✅ 正确
import UserList from '@/views/UserList.vue'
import CommonTable from '@/components/CommonTable/index.vue'
</script>

<template>
  <UserList />
  <CommonTable />
</template>
```

### 5. 方法命名

**使用 camelCase，动词开头：**

```javascript
// ✅ 正确
const handleClick = () => {}
const loadData = () => {}
const getUserInfo = () => {}
const setTheme = () => {}

// ❌ 错误
const click = () => {}
const data = () => {}
```

### 6. Store 命名

**使用 camelCase，use 前缀：**

```javascript
// ✅ 正确
export const useAppStore = defineStore('app', () => {})
export const useUserStore = defineStore('user', () => {})

// ❌ 错误
export const AppStore = defineStore('app', () => {})
```

---

## 代码组织规范

### 1. 导入顺序

**标准导入顺序：**

```javascript
// 1. Vue 相关
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 2. 第三方库
import { ElMessage } from 'element-plus'

// 3. 组件
import CommonTable from '@/components/CommonTable/index.vue'

// 4. 工具函数
import request from '@/utils/request'

// 5. Store
import { useAppStore } from '@/stores/app'

// 6. 类型定义（如果有）
// import type { User } from '@/types/user'
```

### 2. 代码分组

**在组件中按功能分组：**

```javascript
<script setup>
// ========== 导入 ==========
import { ref } from 'vue'

// ========== Props ==========
const props = defineProps({
  title: String
})

// ========== Emits ==========
const emit = defineEmits(['change'])

// ========== 状态 ==========
const count = ref(0)

// ========== 计算属性 ==========
const doubleCount = computed(() => count.value * 2)

// ========== 方法 ==========
const handleClick = () => {
  count.value++
}

// ========== 生命周期 ==========
onMounted(() => {
  // 初始化
})
</script>
```

### 3. 注释规范

**使用中文注释：**

```javascript
// ✅ 正确：使用中文注释
// 加载用户列表数据
const loadUserList = async () => {
  // ...
}

// ❌ 错误：使用英文注释（除非必要）
// Load user list data
const loadUserList = async () => {
  // ...
}
```

**复杂逻辑添加注释：**

```javascript
// 递归处理菜单，将图标字符串转换为组件
const processMenu = (menus) => {
  return menus.map(menu => {
    // 转换图标
    const icon = convertIcon(menu.icon)
    // ...
  })
}
```

---

## ✅ 检查清单

开发新功能时，请检查：

- [ ] 使用 `<script setup>` 语法
- [ ] 组件命名使用 PascalCase
- [ ] 样式使用 `scoped lang="scss"`
- [ ] 使用 `@/utils/request` 发送请求
- [ ] 通过 `menu.json` 配置路由
- [ ] Store 使用 Composition API 风格
- [ ] 使用 Element Plus CSS 变量
- [ ] 导入顺序符合规范
- [ ] 代码有适当的中文注释

---

**遵循规范，保持代码一致性和可维护性！**

