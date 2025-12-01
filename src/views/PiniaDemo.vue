<template>
  <div class="pinia-demo">
    <el-card>
      <template #header>
        <span>Pinia 状态管理演示</span>
      </template>
      
      <el-alert
        title="Pinia 是 Vue 的官方状态管理库，提供简洁、类型安全的状态管理方案"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <!-- 基础计数器演示 -->
      <div class="demo-section">
        <h3>1. 基础计数器</h3>
        <p class="description">演示 Pinia Store 的基本用法：状态、计算属性、方法</p>
        
        <el-card shadow="hover" style="margin-bottom: 20px">
          <div style="text-align: center; padding: 20px 0">
            <div style="font-size: 48px; font-weight: bold; color: var(--el-color-primary); margin-bottom: 20px">
              {{ counterStore.count }}
            </div>
            <div style="margin-bottom: 20px">
              <el-tag :type="counterStore.isEven ? 'success' : 'info'" size="large">
                {{ counterStore.isEven ? '偶数' : '奇数' }}
              </el-tag>
              <el-tag type="warning" size="large" style="margin-left: 10px">
                双倍值: {{ counterStore.doubleCount }}
              </el-tag>
            </div>
            <el-space>
              <el-button type="danger" size="large" @click="counterStore.decrement">
                <el-icon><Minus /></el-icon>
                减少
              </el-button>
              <el-button type="primary" size="large" @click="counterStore.increment">
                <el-icon><Plus /></el-icon>
                增加
              </el-button>
              <el-button type="warning" @click="counterStore.reset">
                <el-icon><Refresh /></el-icon>
                重置
              </el-button>
            </el-space>
          </div>
        </el-card>

        <el-card shadow="hover">
          <h4>步长设置</h4>
          <el-space>
            <span>当前步长：</span>
            <el-input-number 
              v-model="counterStore.step" 
              :min="1" 
              :max="10"
              @change="counterStore.setStep"
            />
            <el-button-group>
              <el-button @click="counterStore.setStep(1)">1</el-button>
              <el-button @click="counterStore.setStep(2)">2</el-button>
              <el-button @click="counterStore.setStep(5)">5</el-button>
              <el-button @click="counterStore.setStep(10)">10</el-button>
            </el-button-group>
          </el-space>
        </el-card>
      </div>

      <el-divider />

      <!-- 直接设置值 -->
      <div class="demo-section">
        <h3>2. 直接设置值</h3>
        <p class="description">演示通过方法直接设置状态值</p>
        <el-space>
          <el-input-number 
            v-model="inputValue" 
            :min="-100" 
            :max="100"
            placeholder="输入数值"
          />
          <el-button type="primary" @click="handleSetCount">
            设置计数
          </el-button>
        </el-space>
      </div>

      <el-divider />

      <!-- 操作历史 -->
      <div class="demo-section">
        <h3>3. 操作历史记录</h3>
        <p class="description">演示状态变化的历史追踪（最近 {{ counterStore.historyCount }} 条记录）</p>
        
        <el-card shadow="hover" v-if="counterStore.history.length === 0">
          <el-empty description="暂无操作记录" :image-size="80" />
        </el-card>
        
        <el-timeline v-else>
          <el-timeline-item
            v-for="(item, index) in counterStore.history"
            :key="index"
            :timestamp="item.timestamp"
            placement="top"
          >
            <el-card shadow="hover">
              <div style="display: flex; justify-content: space-between; align-items: center">
                <div>
                  <el-tag :type="getActionType(item.action)" size="small">
                    {{ getActionLabel(item.action) }}
                  </el-tag>
                  <span style="margin-left: 10px">
                    {{ item.oldValue }} → {{ item.newValue }}
                  </span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>

        <el-button 
          v-if="counterStore.history.length > 0" 
          type="danger" 
          plain 
          @click="counterStore.clearHistory"
          style="margin-top: 15px"
        >
          清空历史记录
        </el-button>
      </div>

      <el-divider />

      <!-- 代码示例 -->
      <div class="demo-section">
        <h3>4. 代码示例</h3>
        <p class="description">如何在组件中使用 Pinia Store</p>
        
        <el-tabs>
          <el-tab-pane label="Store 定义" name="store">
            <pre><code>import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  const increment = () => {
    count.value++
  }
  
  return { count, doubleCount, increment }
})</code></pre>
          </el-tab-pane>
          
          <el-tab-pane label="组件使用" name="component">
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;计数: {{ counterStore.count }}&lt;/p&gt;
    &lt;p&gt;双倍: {{ counterStore.doubleCount }}&lt;/p&gt;
    &lt;button @click="counterStore.increment"&gt;增加&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
&lt;/script&gt;</code></pre>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-divider />

      <!-- Pinia 特性说明 -->
      <div class="demo-section">
        <h3>5. Pinia 核心特性</h3>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8">
            <el-card shadow="hover">
              <h4>🚀 简洁易用</h4>
              <p>API 设计简洁，学习成本低，上手快</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-card shadow="hover">
              <h4>📦 轻量级</h4>
              <p>体积小，性能优秀，适合各种规模的项目</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-card shadow="hover">
              <h4>🔧 类型安全</h4>
              <p>完美支持 TypeScript，提供完整的类型推断</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" style="margin-top: 20px">
            <el-card shadow="hover">
              <h4>🔄 响应式</h4>
              <p>基于 Vue 3 响应式系统，自动追踪状态变化</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" style="margin-top: 20px">
            <el-card shadow="hover">
              <h4>🎯 DevTools</h4>
              <p>支持 Vue DevTools，方便调试和开发</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" style="margin-top: 20px">
            <el-card shadow="hover">
              <h4>⚡ 性能优化</h4>
              <p>支持按需加载，自动代码分割</p>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <!-- 使用说明 -->
      <div class="demo-section">
        <h3>6. 使用说明</h3>
        <ul>
          <li><strong>Store 定义：</strong>使用 <code>defineStore</code> 定义 Store，支持 Options API 和 Composition API 两种风格</li>
          <li><strong>State：</strong>使用 <code>ref</code> 或 <code>reactive</code> 定义响应式状态</li>
          <li><strong>Getters：</strong>使用 <code>computed</code> 定义计算属性，自动缓存结果</li>
          <li><strong>Actions：</strong>定义方法修改状态，支持异步操作</li>
          <li><strong>组件使用：</strong>在组件中通过 <code>useStore()</code> 获取 Store 实例</li>
          <li><strong>响应式：</strong>Store 中的状态变化会自动更新组件，无需手动订阅</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { Plus, Minus, Refresh } from '@element-plus/icons-vue'

const counterStore = useCounterStore()
const inputValue = ref(0)

const handleSetCount = () => {
  counterStore.setCount(inputValue.value)
}

const getActionLabel = (action) => {
  const labels = {
    increment: '增加',
    decrement: '减少',
    reset: '重置',
    setCount: '设置'
  }
  return labels[action] || action
}

const getActionType = (action) => {
  const types = {
    increment: 'success',
    decrement: 'danger',
    reset: 'warning',
    setCount: 'info'
  }
  return types[action] || 'info'
}
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.pinia-demo {
  .demo-section {
    @include demo-section;
  }

  pre {
    @include code-block;
    margin: 0;
    
    code {
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  code {
    background: var(--el-fill-color-light);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
  }
}
</style>

