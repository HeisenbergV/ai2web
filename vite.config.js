import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 设置环境变量静默 Sass 警告（在配置加载前设置）
process.env.SASS_SILENCE_DEPRECATIONS = 'legacy-js-api'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Sass 配置
        // 通过环境变量 SASS_SILENCE_DEPRECATIONS 静默 legacy-js-api 警告
      }
    }
  },
  server: {
    port: 3000,
    open: true
    // Vite 5 自动处理 History API fallback，无需额外配置
  }
})

