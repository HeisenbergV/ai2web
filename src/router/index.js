import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      component: () => import('@/layouts/index.vue'),
      name: 'layout',
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            title: '仪表盘',
            icon: 'Odometer'
          }
        },
        // 404 路由 - 捕获所有未匹配的路由，重定向到首页
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          redirect: '/dashboard'
        }
      ]
    }
  ]
})

// 路由守卫：确保动态路由已加载
router.beforeEach(async (to, from, next) => {
  // 登录页直接放行
  if (to.path === '/login') {
    next()
    return
  }
  
  try {
    // 动态导入 store 和菜单配置
    const { useMenuStore } = await import('@/stores/menu')
    const { getMenuConfig } = await import('@/utils/menu')
    const menuStore = useMenuStore()
    
    // 如果菜单还没加载，先加载菜单（这会添加动态路由）
    if (menuStore.menuList.length === 0) {
      menuStore.loadMenu(getMenuConfig())
      // 等待路由添加完成
      await nextTick()
    }
    
    // 直接放行，让 Vue Router 自己处理路由匹配
    next()
  } catch (error) {
    console.error('路由守卫错误:', error)
    // 发生错误时，重定向到首页
    next({ path: '/dashboard', replace: true })
  }
})

export default router

