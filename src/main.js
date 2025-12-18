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
import { useUserStore } from './stores/user'
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
const userStore = useUserStore()
const menuStore = useMenuStore()

appStore.init()
userStore.init() // 初始化用户信息（从 localStorage 恢复）

// 加载菜单（必须在路由守卫执行前完成，确保动态路由已注册）
// 根据用户角色过滤菜单
const menuConfig = getMenuConfig()
const userRoles = userStore.roles || []
menuStore.loadMenu(menuConfig, userRoles)

// 确保应用挂载
app.mount('#app')

