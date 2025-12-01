<template>
  <div class="header-tools">
    <!-- 全屏 -->
    <el-tooltip content="全屏" placement="bottom">
      <el-icon class="tool-icon" @click="toggleFullscreen">
        <FullScreen />
      </el-icon>
    </el-tooltip>
    
    <!-- 主题切换 -->
    <el-tooltip :content="appStore.theme === 'light' ? '暗色主题' : '亮色主题'" placement="bottom">
      <el-icon class="tool-icon" @click="toggleTheme">
        <Sunny v-if="appStore.theme === 'dark'" />
        <Moon v-else />
      </el-icon>
    </el-tooltip>
    
    <!-- 国际化 -->
    <el-dropdown @command="handleLocaleChange">
      <el-icon class="tool-icon">
        <ChatLineRound />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    
    <!-- 布局切换 -->
    <el-dropdown @command="handleLayoutChange">
      <el-icon class="tool-icon">
        <Grid />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="classic">经典布局</el-dropdown-item>
          <el-dropdown-item command="horizontal">水平布局</el-dropdown-item>
          <el-dropdown-item command="vertical">垂直布局</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { FullScreen, Sunny, Moon, ChatLineRound, Grid } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import { toggleFullscreen } from '@/utils/fullscreen'

const appStore = useAppStore()

const toggleTheme = () => {
  appStore.setTheme(appStore.theme === 'light' ? 'dark' : 'light')
}

const handleLocaleChange = (locale) => {
  appStore.setLocale(locale)
}

const handleLayoutChange = (layout) => {
  appStore.setLayout(layout)
}
</script>

<style scoped lang="scss">
.header-tools {
  display: flex;
  align-items: center;
  gap: 15px;
  
  .tool-icon {
    font-size: 20px;
    cursor: pointer;
    color: #606266;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}
</style>

