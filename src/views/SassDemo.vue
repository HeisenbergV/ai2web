<template>
  <div class="sass-demo">
    <el-card>
      <template #header>
        <span>Sass 预处理器演示</span>
      </template>
      
      <el-alert
        title="展示 Sass/SCSS 的各种特性：变量、嵌套、混合、函数、继承等"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <!-- 变量演示 -->
      <div class="demo-section">
        <h3>1. 变量（Variables）</h3>
        <p class="description">使用 $ 定义变量，统一管理颜色、尺寸等值</p>
        <el-row :gutter="20">
          <el-col :span="6" v-for="color in demoColors" :key="color.name">
            <div class="color-box" :style="{ backgroundColor: color.value }">
              <span>{{ color.name }}</span>
              <span class="color-value">{{ color.value }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <!-- 嵌套演示 -->
      <div class="demo-section">
        <h3>2. 嵌套（Nesting）</h3>
        <p class="description">嵌套选择器，使样式结构更清晰</p>
        <div class="nested-demo">
          <div class="parent">
            <div class="child">
              <div class="grandchild">嵌套结构演示</div>
            </div>
          </div>
        </div>
      </div>

      <el-divider />

      <!-- 混合演示 -->
      <div class="demo-section">
        <h3>3. 混合（Mixins）</h3>
        <p class="description">使用 @mixin 定义可复用的样式块</p>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="mixin-box flex-center">居中布局</div>
          </el-col>
          <el-col :span="8">
            <div class="mixin-box card-shadow">卡片阴影</div>
          </el-col>
          <el-col :span="8">
            <div class="mixin-box hover-scale">悬停缩放</div>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <!-- 函数演示 -->
      <div class="demo-section">
        <h3>4. 函数（Functions）</h3>
        <p class="description">使用内置函数处理颜色、数值等</p>
        <el-row :gutter="20">
          <el-col :span="6" v-for="func in functionDemos" :key="func.name">
            <div class="function-box" :style="{ backgroundColor: func.color }">
              <span>{{ func.name }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <!-- 继承演示 -->
      <div class="demo-section">
        <h3>5. 继承（Extend）</h3>
        <p class="description">使用 @extend 继承样式</p>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="base-button primary-btn">主要按钮</div>
          </el-col>
          <el-col :span="8">
            <div class="base-button success-btn">成功按钮</div>
          </el-col>
          <el-col :span="8">
            <div class="base-button warning-btn">警告按钮</div>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <!-- 运算演示 -->
      <div class="demo-section">
        <h3>6. 运算（Operations）</h3>
        <p class="description">支持数学运算，动态计算尺寸</p>
        <div class="operation-demo">
          <div class="operation-box box-1">基础宽度</div>
          <div class="operation-box box-2">基础宽度 × 2</div>
          <div class="operation-box box-3">基础宽度 × 3</div>
        </div>
      </div>

      <el-divider />

      <!-- 条件语句演示 -->
      <div class="demo-section">
        <h3>7. 条件语句（Control Directives）</h3>
        <p class="description">使用 @if、@for、@each 等控制指令</p>
        <div class="control-demo">
          <div 
            v-for="i in 5" 
            :key="i" 
            :class="`control-item item-${i}`"
          >
            项目 {{ i }}
          </div>
        </div>
      </div>

      <el-divider />

      <!-- 说明 -->
      <div class="demo-section">
        <h3>说明</h3>
        <ul class="feature-list">
          <li>本项目已安装 <code>sass@^1.69.5</code></li>
          <li>Vite 原生支持 Sass，无需额外配置</li>
          <li>组件中使用 <code>&lt;style lang="scss"&gt;</code> 即可使用 Sass 特性</li>
          <li>全局样式文件位于 <code>src/styles/index.scss</code></li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const demoColors = ref([
  { name: '主色', value: '#409eff' },
  { name: '成功', value: '#67c23a' },
  { name: '警告', value: '#e6a23c' },
  { name: '危险', value: '#f56c6c' }
])

const functionDemos = ref([
  { name: '原色', color: '#409eff' },
  { name: '变亮', color: '#66b3ff' },
  { name: '变暗', color: '#337ecc' },
  { name: '透明度', color: 'rgba(64, 158, 255, 0.5)' }
])
</script>

<style scoped lang="scss">
// 导入 Sass 模块（新 API）
@use "sass:color";
@use "sass:math";

// ========== Sass 变量 ==========
$primary-color: #409eff;
$success-color: #67c23a;
$warning-color: #e6a23c;
$danger-color: #f56c6c;
$base-size: 16px;
$base-spacing: 20px;
$border-radius: 8px;
$transition-time: 0.3s;

.sass-demo {
  .demo-section {
    margin-bottom: $base-spacing;

    h3 {
      margin-bottom: 15px;
      color: var(--el-text-color-primary);
      font-size: $base-size + 4px;
    }

    .description {
      color: var(--el-text-color-secondary);
      margin-bottom: 15px;
      font-size: $base-size - 2px;
    }

    // ========== 嵌套演示 ==========
    .nested-demo {
      padding: $base-spacing;
      background: var(--el-bg-color-page);
      border-radius: $border-radius;

      .parent {
        padding: $base-spacing;
        background: color.scale($primary-color, $lightness: 40%);
        border-radius: $border-radius;

        .child {
          padding: $base-spacing;
          background: color.scale($primary-color, $lightness: 30%);
          border-radius: $border-radius;

          .grandchild {
            padding: math.div($base-spacing, 2);
            background: color.scale($primary-color, $lightness: 20%);
            color: white;
            text-align: center;
            border-radius: math.div($border-radius, 2);
          }
        }
      }
    }

    // ========== 混合演示 ==========
    // 定义混合
    @mixin flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @mixin card-shadow {
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }

    @mixin hover-scale {
      transition: transform $transition-time;

      &:hover {
        transform: scale(1.05);
      }
    }

    .mixin-box {
      padding: $base-spacing;
      background: var(--el-bg-color);
      border-radius: $border-radius;
      margin-bottom: 10px;
      min-height: 80px;
      color: var(--el-text-color-primary);
    }

    .flex-center {
      @include flex-center;
    }

    .card-shadow {
      @include card-shadow;
    }

    .hover-scale {
      @include hover-scale;
    }

    // ========== 颜色变量演示 ==========
    .color-box {
      padding: $base-spacing;
      border-radius: $border-radius;
      color: white;
      text-align: center;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;

      .color-value {
        font-size: $base-size - 4px;
        opacity: 0.9;
      }
    }

    // ========== 函数演示 ==========
    .function-box {
      padding: $base-spacing;
      border-radius: $border-radius;
      color: white;
      text-align: center;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    // ========== 继承演示 ==========
    %base-button {
      padding: 10px 20px;
      border-radius: $border-radius;
      border: none;
      cursor: pointer;
      font-size: $base-size;
      transition: all $transition-time;
      text-align: center;
      display: inline-block;

      &:hover {
        opacity: 0.8;
        transform: translateY(-2px);
      }
    }

    .base-button {
      @extend %base-button;
    }

    .primary-btn {
      background-color: $primary-color;
      color: white;
    }

    .success-btn {
      background-color: $success-color;
      color: white;
    }

    .warning-btn {
      background-color: $warning-color;
      color: white;
    }

    // ========== 运算演示 ==========
    .operation-demo {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .operation-box {
        padding: $base-spacing;
        background: var(--el-bg-color);
        border-radius: $border-radius;
        text-align: center;
        color: var(--el-text-color-primary);
      }

      .box-1 {
        width: $base-spacing * 4; // 80px
      }

      .box-2 {
        width: $base-spacing * 8; // 160px
      }

      .box-3 {
        width: $base-spacing * 12; // 240px
      }
    }

    // ========== 控制指令演示 ==========
    .control-demo {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      // 使用 @for 循环生成样式
      @for $i from 1 through 5 {
        .item-#{$i} {
          padding: $base-spacing;
          background: rgba($primary-color, 0.1 + $i * 0.1);
          border-radius: $border-radius;
          color: var(--el-text-color-primary);
          flex: 1;
          min-width: 100px;
          text-align: center;
          border: 2px solid rgba($primary-color, 0.2 + $i * 0.1);
        }
      }
    }

    // ========== 说明列表 ==========
    .feature-list {
      color: var(--el-text-color-regular);
      line-height: 2;
      padding-left: 20px;

      li {
        margin-bottom: 8px;

        code {
          background: var(--el-bg-color-page);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          color: $primary-color;
        }
      }
    }
  }
}
</style>

