# 使用指南 - 如何与 AI 协作开发

> 本文档说明如何使用这套文档系统，让 AI 快速理解项目并高效协作。

## 🎯 使用场景

### 场景 1：开启新会话（最重要）

**步骤：**

1. **复制以下提示词发送给 AI：**
   ```
   你好！请先阅读以下文档了解项目架构：
   
   1. docs/AI_SYSTEM_PROMPT.md - 系统架构和核心概念
   2. docs/QUICK_START.md - 快速上手指南
   
   阅读完成后，请回复"已理解项目架构，可以开始开发"。
   ```

2. **等待 AI 确认理解后，再提出具体需求**

### 场景 2：开发新功能

**步骤：**

1. **使用对话模板描述需求**
   - 打开 `docs/AI_CONVERSATION_TEMPLATE.md`
   - 选择合适的模板（如"添加新功能页面"）
   - 复制模板并填写你的具体需求

2. **发送给 AI**

3. **AI 开发时参考规范**
   - AI 会自动参考 `docs/DEVELOPMENT_GUIDE.md`
   - 确保代码符合规范

### 场景 3：修复 Bug

**步骤：**

1. **使用调试模板**
   - 打开 `docs/AI_CONVERSATION_TEMPLATE.md`
   - 使用"调试模板"描述问题

2. **提供错误信息和相关代码**

3. **AI 会参考规范修复问题**

## 📋 文档使用流程

```
新会话开始
    ↓
让 AI 阅读 AI_SYSTEM_PROMPT.md 和 QUICK_START.md
    ↓
AI 确认理解
    ↓
使用 AI_CONVERSATION_TEMPLATE.md 中的模板描述需求
    ↓
AI 参考 DEVELOPMENT_GUIDE.md 开发代码
    ↓
完成开发
```

## 💡 最佳实践

### 1. 每次新会话都要先读文档

**好的做法：**
```
请先阅读 docs/AI_SYSTEM_PROMPT.md 了解项目架构
```

**不好的做法：**
```
直接提出需求，不先让 AI 了解项目
```

### 2. 使用模板描述需求

**好的做法：**
```
使用 AI_CONVERSATION_TEMPLATE.md 中的模板，
详细描述需求
```

**不好的做法：**
```
简单说"做个用户管理"，没有详细说明
```

### 3. 明确文件位置

**好的做法：**
```
在 src/views/UserList.vue 中添加状态列
```

**不好的做法：**
```
加个状态列（没有说明位置）
```

## 🔧 配置文件说明

### .cursorrules

**位置：** 项目根目录

**作用：** Cursor AI 会自动读取此文件，了解项目规则

**内容：** 项目概述、核心规则、编码规范

**注意：** 此文件会自动生效，无需手动加载

### docs/ 目录

**位置：** `docs/`

**作用：** 详细的开发文档

**文件：**
- `AI_SYSTEM_PROMPT.md` - AI 系统提示词
- `DEVELOPMENT_GUIDE.md` - 开发规范
- `QUICK_START.md` - 快速参考
- `AI_CONVERSATION_TEMPLATE.md` - 对话模板

## 📝 示例对话

### 示例 1：新会话开始

**用户：**
```
你好！请先阅读以下文档了解项目架构：

1. docs/AI_SYSTEM_PROMPT.md - 系统架构和核心概念
2. docs/QUICK_START.md - 快速上手指南

阅读完成后，请回复"已理解项目架构，可以开始开发"。
```

**AI：**
```
已理解项目架构，可以开始开发。

我了解到：
- 这是一个 Vue3 + Pinia + Element Plus 的后台管理框架
- 使用配置驱动路由（menu.json）
- 必须使用 @/utils/request 发送请求
- 使用 Composition API (<script setup>)
- 样式使用 scoped lang="scss"

请告诉我需要开发什么功能？
```

### 示例 2：添加新功能

**用户：**
```
我需要添加一个新功能页面。

【功能描述】
- 功能名称：用户管理
- 页面路径：/users
- 主要功能：显示用户列表，支持分页、搜索

【需求详情】
1. 列表页面：显示用户ID、姓名、邮箱
2. 搜索功能：支持按姓名搜索
3. 分页功能：每页10条

【参考】
- 参考 src/views/TableDemo.vue
- 使用 CommonTable 组件
- API 接口：GET /api/users

请帮我完成这个功能。
```

**AI：**
```
好的，我来帮你创建用户管理页面。

根据项目规范，我需要：
1. 创建 src/views/UserList.vue 组件
2. 在 src/config/menu.json 添加菜单配置
3. 使用 CommonTable 组件和 @/utils/request

开始开发...
```

## ✅ 检查清单

每次开发前检查：

- [ ] AI 已阅读 `AI_SYSTEM_PROMPT.md`
- [ ] AI 已阅读 `QUICK_START.md`
- [ ] 使用模板描述需求
- [ ] 明确文件位置
- [ ] 提供 API 信息（如需要）
- [ ] 提供参考代码（如需要）

## 🚨 常见问题

### Q1: AI 没有遵循规范怎么办？

**A:** 提醒 AI 参考 `docs/DEVELOPMENT_GUIDE.md`，并明确指出不符合规范的地方。

### Q2: AI 不理解项目结构怎么办？

**A:** 让 AI 重新阅读 `docs/AI_SYSTEM_PROMPT.md` 和 `docs/QUICK_START.md`。

### Q3: 如何确保代码质量？

**A:** 
1. 确保 AI 已阅读开发规范
2. 开发完成后，让 AI 检查代码是否符合规范
3. 参考现有代码风格

### Q4: 新会话时忘记让 AI 读文档怎么办？

**A:** 随时可以让 AI 阅读文档，然后继续开发。

## 📚 相关文档

- [文档目录](./README.md) - 所有文档索引
- [AI 系统提示词](./AI_SYSTEM_PROMPT.md) - 系统架构
- [开发规范](./DEVELOPMENT_GUIDE.md) - 编码规范
- [快速上手指南](./QUICK_START.md) - 快速参考
- [AI 对话模板](./AI_CONVERSATION_TEMPLATE.md) - 对话模板

---

**使用文档，让 AI 成为你的高效开发伙伴！**

