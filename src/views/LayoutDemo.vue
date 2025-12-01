<template>
  <div class="layout-demo">
    <el-card>
      <template #header>
        <span>多种布局</span>
      </template>
      
      <el-alert
        title="支持经典布局、水平布局、垂直布局"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <div class="demo-section">
        <h3>当前布局：{{ layoutNames[appStore.layout] }}</h3>
        
        <el-space>
          <el-button 
            type="primary" 
            :plain="appStore.layout !== 'classic'"
            @click="appStore.setLayout('classic')"
          >
            <el-icon><Grid /></el-icon>
            经典布局
          </el-button>
          <el-button 
            type="primary" 
            :plain="appStore.layout !== 'horizontal'"
            @click="appStore.setLayout('horizontal')"
          >
            <el-icon><Menu /></el-icon>
            水平布局
          </el-button>
          <el-button 
            type="primary" 
            :plain="appStore.layout !== 'vertical'"
            @click="appStore.setLayout('vertical')"
          >
            <el-icon><List /></el-icon>
            垂直布局
          </el-button>
        </el-space>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>布局说明</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover">
              <h4>经典布局</h4>
              <p>传统的后台管理布局，左侧菜单栏，顶部导航栏，内容区域在中间。</p>
              <el-tag type="info">经典</el-tag>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <h4>水平布局</h4>
              <p>菜单栏在顶部水平排列，适合菜单项较少的场景。</p>
              <el-tag type="success">水平</el-tag>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <h4>垂直布局</h4>
              <p>菜单栏在左侧垂直排列，适合菜单项较多的场景。</p>
              <el-tag type="warning">垂直</el-tag>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>布局切换效果</h3>
        <p>切换布局后，页面会立即应用新的布局模式。布局设置会自动保存到 localStorage。</p>
        <el-alert
          title="提示：切换布局后，请查看页面左侧或顶部的菜单栏变化"
          type="warning"
          :closable="false"
        />
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>说明</h3>
        <ul>
          <li>布局设置会自动保存到 localStorage</li>
          <li>切换布局后，整个应用会立即应用新布局</li>
          <li>支持三种布局模式：经典、水平、垂直</li>
          <li>可以根据业务需求选择合适的布局模式</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { Grid, Menu, List } from '@element-plus/icons-vue'

const appStore = useAppStore()

const layoutNames = {
  classic: '经典布局',
  horizontal: '水平布局',
  vertical: '垂直布局'
}
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.layout-demo {
  .demo-section {
    @include demo-section;

    .el-tag {
      margin-top: 10px;
    }
  }
}
</style>

