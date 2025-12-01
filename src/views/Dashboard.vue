<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" v-for="feature in features" :key="feature.name">
        <el-card 
          class="feature-card" 
          shadow="hover"
          :class="{ 'clickable': feature.path }"
          @click="handleCardClick(feature)"
        >
          <div class="feature-icon">
            <el-icon :size="40" :color="feature.color">
              <component :is="feature.icon" />
            </el-icon>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="welcome-card" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>欢迎使用 AI to Web</span>
        </div>
      </template>
      <p>这是一个基于 Vue3 + Pinia + Vue Router + Element Plus 的轻量级后台管理框架</p>
      <p>点击左侧菜单查看各个特性的详细演示</p>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Odometer,
  Setting,
  ChatDotRound,
  Monitor,
  Grid,
  Menu,
  Connection,
  Document
} from '@element-plus/icons-vue'

const router = useRouter()

const features = ref([
  {
    name: 'Vue3',
    title: 'Vue3',
    description: '使用最新的 Composition API',
    icon: Odometer,
    color: '#42b883',
    path: null // 技术栈特性，无对应演示页面
  },
  {
    name: 'Pinia',
    title: 'Pinia',
    description: '状态管理',
    icon: Setting,
    color: '#ffd43b',
    path: null
  },
  {
    name: 'Vue Router',
    title: 'Vue Router',
    description: '路由管理',
    icon: ChatDotRound,
    color: '#4fc3f7',
    path: null
  },
  {
    name: 'Element Plus',
    title: 'Element Plus',
    description: 'UI 组件库',
    icon: Monitor,
    color: '#409eff',
    path: null
  },
  {
    name: 'Sass',
    title: 'Sass',
    description: 'CSS 预处理器',
    icon: Grid,
    color: '#cf649a',
    path: '/sass'
  },
  {
    name: '主题设置',
    title: '主题设置',
    description: '支持亮色/暗色主题切换',
    icon: Setting,
    color: '#ff9800',
    path: '/theme'
  },
  {
    name: '国际化',
    title: '国际化',
    description: '支持多语言（中文/英文）',
    icon: ChatDotRound,
    color: '#9c27b0',
    path: '/i18n'
  },
  {
    name: '全屏功能',
    title: '全屏功能',
    description: '一键全屏',
    icon: Monitor,
    color: '#00bcd4',
    path: null // 全屏功能在顶部工具栏，无独立页面
  },
  {
    name: '多种布局',
    title: '多种布局',
    description: '经典布局、水平布局、垂直布局',
    icon: Grid,
    color: '#4caf50',
    path: '/layout'
  },
  {
    name: '动态菜单',
    title: '动态菜单',
    description: '通过 JSON 配置菜单',
    icon: Menu,
    color: '#ff5722',
    path: null // 动态菜单功能在菜单配置中，无独立页面
  },
  {
    name: '请求封装',
    title: '请求封装',
    description: '统一的 API 请求处理',
    icon: Connection,
    color: '#2196f3',
    path: '/request'
  },
  {
    name: '公共组件',
    title: '公共组件',
    description: 'Table、分页等组件化',
    icon: Document,
    color: '#607d8b',
    path: '/table'
  }
])

const handleCardClick = (feature) => {
  if (feature.path) {
    router.push(feature.path)
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  .feature-card {
    margin-bottom: 20px;
    text-align: center;
    transition: transform 0.3s;
    cursor: default;

    &.clickable {
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--el-box-shadow-light);
      }
    }

    &:hover:not(.clickable) {
      transform: translateY(-5px);
    }

    .feature-icon {
      margin-bottom: 15px;
    }

    h3 {
      margin: 10px 0;
      font-size: 18px;
      font-weight: 600;
    }

    p {
      color: var(--el-text-color-secondary);
      font-size: 14px;
      margin: 0;
    }
  }

  .welcome-card {
    .card-header {
      font-size: 18px;
      font-weight: 600;
    }

    p {
      margin: 10px 0;
      color: var(--el-text-color-regular);
      line-height: 1.8;
    }
  }
}
</style>

