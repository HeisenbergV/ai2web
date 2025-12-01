import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router'
import App from './App.vue'
import './styles/index.scss'
import { useAppStore } from './stores/app'
import { useMenuStore } from './stores/menu'
import { getMenuConfig } from './utils/menu'

const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

// 初始化应用（在 mount 之前）
const appStore = useAppStore()
const menuStore = useMenuStore()

appStore.init()

// 加载菜单（必须在路由守卫执行前完成，确保动态路由已注册）
// 这样刷新页面时，路由守卫执行时菜单已经加载完成
menuStore.loadMenu(getMenuConfig())

// 确保应用挂载
app.mount('#app')

