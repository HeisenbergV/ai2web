import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([])
  
  // 将图标字符串转换为组件
  const convertIcon = (iconName) => {
    if (!iconName) return null
    const icon = ElementPlusIconsVue[iconName]
    // 使用 markRaw 避免组件被响应式化
    return icon ? markRaw(icon) : null
  }
  
  // 递归处理菜单，转换图标
  const processMenu = (menus) => {
    return menus.map(menu => {
      const processedMenu = {
        ...menu,
        icon: convertIcon(menu.icon)
      }
      if (menu.children && menu.children.length > 0) {
        processedMenu.children = processMenu(menu.children)
      }
      return processedMenu
    })
  }
  
  // 从JSON加载菜单
  const loadMenu = (menuData) => {
    const processedMenuData = processMenu(menuData)
    menuList.value = processedMenuData
    // 动态添加路由
    addRoutes(processedMenuData)
  }
  
  // 递归添加路由
  const addRoutes = (menus, parentPath = '') => {
    menus.forEach(menu => {
      // 如果有子菜单，递归处理子菜单
      if (menu.children && menu.children.length > 0) {
        // 如果子菜单路径以 / 开头，说明是绝对路径，不拼接父路径
        addRoutes(menu.children, menu.path && menu.path.startsWith('/') ? '' : parentPath + (menu.path || ''))
      } else if (menu.path && menu.component) {
        // 只有叶子节点且有 component 才添加路由
        // 如果路径以 / 开头，使用绝对路径，否则拼接父路径
        const finalPath = menu.path.startsWith('/') ? menu.path : (parentPath + menu.path)
        const route = {
          path: finalPath,
          name: menu.name,
          component: () => import(`@/views/${menu.component}.vue`),
          meta: {
            title: menu.title,
            icon: menu.icon,
            hidden: menu.hidden || false
          }
        }
        router.addRoute('layout', route)
      }
    })
  }
  
  return {
    menuList,
    loadMenu
  }
})

