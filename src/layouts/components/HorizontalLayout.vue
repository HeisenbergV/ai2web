<template>
  <div class="horizontal-layout">
    <el-container>
      <!-- 顶部导航 -->
      <el-header class="layout-header">
        <div class="header-left">
          <span class="logo">Min AI Admin</span>
        </div>
        <div class="header-center">
          <HorizontalMenu />
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
  </div>
</template>

<script setup>
import HorizontalMenu from './HorizontalMenu.vue'
import HeaderTools from './HeaderTools.vue'
</script>

<style scoped lang="scss">
.horizontal-layout {
  width: 100%;
  height: 100%;
  
  :deep(.el-container) {
    height: 100%;
  }
  
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);
    flex-shrink: 0;
    
    .header-left {
      .logo {
        font-size: 18px;
        font-weight: bold;
        color: var(--primary-color);
      }
    }
    
    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
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
}
</style>

