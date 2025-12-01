import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 主题设置
  const theme = ref('light') // light | dark
  
  // 国际化
  const locale = ref('zh-cn') // zh-cn | en
  
  // 布局模式
  const layout = ref('classic') // classic | horizontal | vertical
  
  // 侧边栏折叠
  const sidebarCollapse = ref(false)
  
  // 设置主题
  const setTheme = (val) => {
    theme.value = val
    document.documentElement.classList.toggle('dark', val === 'dark')
    localStorage.setItem('theme', val)
  }
  
  // 设置国际化
  const setLocale = (val) => {
    locale.value = val
    localStorage.setItem('locale', val)
  }
  
  // 设置布局
  const setLayout = (val) => {
    layout.value = val
    localStorage.setItem('layout', val)
  }
  
  // 切换侧边栏
  const toggleSidebar = () => {
    sidebarCollapse.value = !sidebarCollapse.value
  }
  
  // 初始化
  const init = () => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    const savedLocale = localStorage.getItem('locale') || 'zh-cn'
    const savedLayout = localStorage.getItem('layout') || 'classic'
    
    setTheme(savedTheme)
    setLocale(savedLocale)
    setLayout(savedLayout)
  }
  
  return {
    theme,
    locale,
    layout,
    sidebarCollapse,
    setTheme,
    setLocale,
    setLayout,
    toggleSidebar,
    init
  }
})

