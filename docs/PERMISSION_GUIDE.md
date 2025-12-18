# 权限控制使用指南

> 本文档说明如何在项目中使用权限控制功能，实现不同角色看到不同的菜单。

## 📋 功能概述

系统支持基于角色的权限控制（RBAC），可以：
- ✅ 在菜单配置中指定角色权限
- ✅ 根据用户角色自动过滤菜单
- ✅ 路由级别的权限守卫
- ✅ 支持多角色配置
- ✅ 通用的权限检查工具函数

## 🎯 核心概念

### 1. 角色（Roles）

角色是用户身份的标识，例如：
- `admin` - 管理员
- `user` - 普通用户
- `editor` - 编辑者
- 可以自定义任意角色名称

### 2. 菜单权限配置

在 `menu.json` 中，每个菜单项可以配置 `roles` 字段：

```json
{
  "path": "/admin",
  "name": "Admin",
  "title": "系统管理",
  "icon": "Setting",
  "roles": ["admin"],  // 只有 admin 角色可以看到
  "children": [...]
}
```

**权限规则：**
- 如果菜单项**没有配置** `roles` 字段，则**所有用户**都可以看到
- 如果菜单项**配置了** `roles` 字段，则只有**拥有其中任一角色**的用户可以看到
- 权限检查使用 **OR 逻辑**（用户有任一角色即可）

## 📝 使用步骤

### 步骤 1：配置菜单权限

在 `src/config/menu.json` 中为菜单项添加 `roles` 字段：

```json
[
  {
    "path": "/dashboard",
    "name": "Dashboard",
    "title": "仪表盘",
    "icon": "Odometer",
    "component": "Dashboard"
    // 没有 roles，所有用户都可以看到
  },
  {
    "path": "/admin",
    "name": "Admin",
    "title": "系统管理",
    "icon": "Setting",
    "roles": ["admin"],  // 只有管理员可以看到
    "children": [
      {
        "path": "/admin/users",
        "name": "UserManagement",
        "title": "用户管理",
        "icon": "User",
        "component": "UserManagement",
        "roles": ["admin"]  // 子菜单也需要配置权限
      }
    ]
  },
  {
    "path": "/user",
    "name": "User",
    "title": "个人中心",
    "icon": "User",
    "roles": ["user", "admin"],  // 普通用户和管理员都可以看到
    "children": [...]
  }
]
```

### 步骤 2：登录时设置用户角色

在登录页面，登录成功后设置用户角色：

```vue
<script setup>
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { getMenuConfig } from '@/utils/menu'

const userStore = useUserStore()
const menuStore = useMenuStore()

const handleLogin = async () => {
  // 1. 调用登录 API
  const response = await loginApi({ username, password })
  
  // 2. 设置用户信息和角色
  userStore.login({
    token: response.data.token,
    userInfo: response.data.userInfo,
    roles: response.data.userInfo.roles  // 从后端获取角色
  })
  
  // 3. 重新加载菜单（根据角色过滤）
  const menuConfig = getMenuConfig()
  menuStore.reloadMenu(menuConfig, userStore.roles)
  
  // 4. 跳转到首页
  router.push('/')
}
</script>
```

### 步骤 3：在组件中使用权限检查

#### 3.1 检查用户角色

```vue
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 检查是否为管理员
if (userStore.isAdmin) {
  // 管理员逻辑
}

// 检查是否有指定角色
if (userStore.hasRole('admin')) {
  // 有 admin 角色
}

// 检查是否有任一角色
if (userStore.hasAnyRole(['admin', 'editor'])) {
  // 有 admin 或 editor 角色
}
</script>
```

#### 3.2 在模板中条件渲染

```vue
<template>
  <div>
    <!-- 只有管理员可以看到 -->
    <el-button v-if="userStore.hasRole('admin')" @click="deleteUser">
      删除用户
    </el-button>
    
    <!-- 管理员或编辑者可以看到 -->
    <el-button v-if="userStore.hasAnyRole(['admin', 'editor'])" @click="editUser">
      编辑用户
    </el-button>
  </div>
</template>
```

#### 3.3 使用权限工具函数

```javascript
import { checkMenuPermission, checkRoutePermission } from '@/utils/permission'

// 检查菜单权限
const hasPermission = checkMenuPermission(menuItem, userRoles)

// 检查路由权限
const canAccess = checkRoutePermission(route, userRoles)
```

## 🔧 API 参考

### User Store (`src/stores/user.js`)

#### 状态

- `userInfo` - 用户信息对象
- `token` - 用户 token
- `roles` - 用户角色数组
- `isLoggedIn` - 是否已登录（计算属性）
- `isAdmin` - 是否为管理员（计算属性）

#### 方法

- `login(loginData)` - 登录，设置用户信息和角色
- `logout()` - 登出，清除用户信息
- `setRoles(roleList)` - 设置用户角色
- `hasRole(role)` - 检查是否有指定角色
- `hasAnyRole(roleList)` - 检查是否有任一角色
- `hasAllRoles(roleList)` - 检查是否有所有角色
- `init()` - 从 localStorage 恢复用户信息

### Permission Utils (`src/utils/permission.js`)

- `checkMenuPermission(menuItem, userRoles)` - 检查菜单权限
- `filterMenusByRoles(menus, userRoles)` - 过滤菜单
- `checkRoutePermission(route, userRoles)` - 检查路由权限

### Menu Store (`src/stores/menu.js`)

- `loadMenu(menuData, userRoles)` - 加载菜单（根据角色过滤）
- `reloadMenu(menuData, userRoles)` - 重新加载菜单（用于角色切换）

## 📖 示例场景

### 场景 1：管理员和普通用户看到不同菜单

**配置：**

```json
{
  "path": "/admin",
  "title": "系统管理",
  "roles": ["admin"]  // 只有管理员
}
```

**登录：**

```javascript
// 管理员登录
userStore.login({
  roles: ['admin']
})

// 普通用户登录
userStore.login({
  roles: ['user']
})
```

**结果：**
- 管理员可以看到"系统管理"菜单
- 普通用户看不到"系统管理"菜单

### 场景 2：多角色权限

**配置：**

```json
{
  "path": "/content",
  "title": "内容管理",
  "roles": ["admin", "editor"]  // 管理员或编辑者
}
```

**结果：**
- 拥有 `admin` 或 `editor` 角色的用户都可以看到

### 场景 3：无权限配置（公共菜单）

**配置：**

```json
{
  "path": "/dashboard",
  "title": "仪表盘"
  // 没有 roles 字段
}
```

**结果：**
- 所有用户都可以看到

## ⚠️ 注意事项

1. **菜单权限继承**
   - 父菜单配置了 `roles`，子菜单也需要配置
   - 如果父菜单无权限，子菜单即使有权限也不会显示

2. **路由权限守卫**
   - 系统会自动检查路由权限
   - 无权限访问会重定向到首页

3. **角色切换**
   - 切换角色后需要调用 `menuStore.reloadMenu()` 刷新菜单

4. **持久化**
   - 用户信息和角色会自动保存到 localStorage
   - 刷新页面后会自动恢复

5. **默认行为**
   - 没有配置 `roles` 的菜单项，默认所有用户都可以访问
   - 这是为了向后兼容，方便逐步添加权限控制

## 🚀 最佳实践

1. **角色命名规范**
   - 使用小写字母
   - 使用有意义的名称（如 `admin`, `user`, `editor`）

2. **权限粒度**
   - 菜单级权限：控制菜单显示
   - 路由级权限：控制页面访问
   - 按钮级权限：在组件中使用 `hasRole()` 控制按钮显示

3. **安全性**
   - 前端权限控制只是 UI 层面的控制
   - **后端必须也要做权限验证**

4. **测试**
   - 测试不同角色的菜单显示
   - 测试直接访问无权限路由的行为

## 📚 相关文档

- [开发规范](./DEVELOPMENT_GUIDE.md) - 编码规范
- [快速上手指南](./QUICK_START.md) - 项目结构
- [系统架构](./AI_SYSTEM_PROMPT.md) - 架构说明

