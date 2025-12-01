<template>
  <div class="i18n-demo">
    <el-card>
      <template #header>
        <span>国际化</span>
      </template>
      
      <el-alert
        title="支持多语言（中文/英文）"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <div class="demo-section">
        <h3>当前语言：{{ appStore.locale === 'zh-cn' ? '中文' : 'English' }}</h3>
        
        <el-space>
          <el-button 
            type="primary" 
            :plain="appStore.locale !== 'zh-cn'"
            @click="appStore.setLocale('zh-cn')"
          >
            <el-icon><ChatDotRound /></el-icon>
            中文
          </el-button>
          <el-button 
            type="primary" 
            :plain="appStore.locale !== 'en'"
            @click="appStore.setLocale('en')"
          >
            <el-icon><ChatDotRound /></el-icon>
            English
          </el-button>
        </el-space>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>语言切换演示</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <h4>中文示例</h4>
              <p>这是中文内容示例。国际化功能允许您轻松切换应用的语言。</p>
              <el-tag>标签</el-tag>
              <el-tag type="success">成功</el-tag>
              <el-tag type="warning">警告</el-tag>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <h4>English Example</h4>
              <p>This is an English content example. The i18n feature allows you to easily switch the application language.</p>
              <el-tag>Tag</el-tag>
              <el-tag type="success">Success</el-tag>
              <el-tag type="warning">Warning</el-tag>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>说明</h3>
        <ul>
          <li>语言设置会自动保存到 localStorage</li>
          <li>切换语言后，整个应用会应用新语言</li>
          <li>当前支持中文和英文两种语言</li>
          <li>可以根据需要扩展更多语言支持</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { ChatDotRound } from '@element-plus/icons-vue'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.i18n-demo {
  .demo-section {
    @include demo-section;

    .el-tag {
      margin-right: 10px;
      margin-top: 10px;
    }
  }
}
</style>

