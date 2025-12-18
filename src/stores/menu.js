import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { filterMenusByRoles } from '@/utils/permission'

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
  
  // 从JSON加载菜单（支持权限过滤）
  const loadMenu = (menuData, userRoles = []) => {
    // 先根据权限过滤菜单
    const filteredMenus = filterMenusByRoles(menuData, userRoles)
    // 处理图标转换
    const processedMenuData = processMenu(filteredMenus)
    menuList.value = processedMenuData
    // 动态添加路由（只添加有权限的路由）
    addRoutes(processedMenuData)
  }
  
  // 重新加载菜单（用于角色切换后刷新菜单）
  const reloadMenu = (menuData, userRoles = []) => {
    // 清除现有路由（除了基础路由）
    clearDynamicRoutes()
    // 重新加载菜单
    loadMenu(menuData, userRoles)
  }
  
  // 清除动态添加的路由
  const clearDynamicRoutes = () => {
    // 获取所有路由
    const routes = router.getRoutes()
    routes.forEach(route => {
      // 只删除动态添加的路由（meta 中有 title 的）
      if (route.meta && route.meta.title && route.name !== 'Dashboard' && route.name !== 'NotFound') {
        router.removeRoute(route.name)
      }
    })
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
            hidden: menu.hidden || false,
            roles: menu.roles || [] // 保存权限信息到路由 meta
          }
        }
        router.addRoute('layout', route)
      }
    })
  }
  
  return {
    menuList,
    loadMenu,
    reloadMenu
  }
})

