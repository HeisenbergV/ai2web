<template>
  <div class="vertical-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside 
        :width="appStore.sidebarCollapse ? '64px' : '200px'"
        class="layout-aside"
      >
        <div class="logo-wrapper">
          <span v-if="!appStore.sidebarCollapse" class="logo">AI to Web</span>
          <el-icon v-else class="logo-icon" @click="appStore.toggleSidebar">
            <Menu />
          </el-icon>
        </div>
        <Sidebar />
      </el-aside>
      
      <el-container>
        <!-- 顶部导航 -->
        <el-header class="layout-header">
          <div class="header-left">
            <el-icon class="collapse-icon" @click="appStore.toggleSidebar">
              <Menu />
            </el-icon>
          </div>
          <div class="header-right">
            <HeaderTools />
          </div>
        </el-header>
        
        <!-- 主内容区 -->
        <el-main class="layout-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Menu } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import Sidebar from './Sidebar.vue'
import HeaderTools from './HeaderTools.vue'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
.vertical-layout {
  width: 100%;
  height: 100%;
  
  :deep(.el-container) {
    height: 100%;
  }
  
  .layout-aside {
    background: var(--el-bg-color);
    transition: width 0.3s;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid var(--el-border-color);
    
    .logo-wrapper {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--el-border-color);
      flex-shrink: 0;
      
      .logo {
        color: var(--el-text-color-primary);
        font-size: 18px;
        font-weight: bold;
      }
      
      .logo-icon {
        color: var(--el-text-color-primary);
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
  
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);
    flex-shrink: 0;
    
    .collapse-icon {
      font-size: 20px;
      cursor: pointer;
      color: var(--el-text-color-primary);
    }
  }
  
  .layout-main {
    background: var(--el-bg-color-page);
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    min-height: 0;
  }
  
  :deep(.el-container) {
    display: flex;
    flex-direction: row;
    
    > .el-container {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

