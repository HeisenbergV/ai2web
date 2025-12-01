<template>
  <div class="theme-demo">
    <el-card>
      <template #header>
        <span>主题设置</span>
      </template>
      
      <el-alert
        title="支持亮色/暗色主题切换"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <div class="demo-section">
        <h3>当前主题：{{ appStore.theme === 'light' ? '亮色' : '暗色' }}</h3>
        
        <el-space>
          <el-button 
            type="primary" 
            :plain="appStore.theme !== 'light'"
            @click="appStore.setTheme('light')"
          >
            <el-icon><Sunny /></el-icon>
            亮色主题
          </el-button>
          <el-button 
            type="primary" 
            :plain="appStore.theme !== 'dark'"
            @click="appStore.setTheme('dark')"
          >
            <el-icon><Moon /></el-icon>
            暗色主题
          </el-button>
        </el-space>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>主题效果演示</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover">
              <h4>卡片标题</h4>
              <p>这是一个演示卡片，展示当前主题下的样式效果</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <h4>按钮组</h4>
              <el-space>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
              </el-space>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <h4>文本颜色</h4>
              <p style="color: var(--el-text-color-primary)">主要文本</p>
              <p style="color: var(--el-text-color-regular)">常规文本</p>
              <p style="color: var(--el-text-color-secondary)">次要文本</p>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>说明</h3>
        <ul>
          <li>主题设置会自动保存到 localStorage</li>
          <li>切换主题后，整个应用会立即应用新主题</li>
          <li>支持亮色和暗色两种主题模式</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { Sunny, Moon } from '@element-plus/icons-vue'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.theme-demo {
  .demo-section {
    @include demo-section;
  }
}
</style>

