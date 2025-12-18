/**
 * 权限工具函数
 * 提供通用的权限检查方法
 */

/**
 * 检查菜单项是否有权限访问
 * @param {Object} menuItem - 菜单项配置
 * @param {Array} userRoles - 用户角色数组
 * @returns {Boolean} 是否有权限
 */
export const checkMenuPermission = (menuItem, userRoles = []) => {
  // 如果没有配置 roles 字段，默认所有用户都可以访问
  if (!menuItem.roles || !Array.isArray(menuItem.roles) || menuItem.roles.length === 0) {
    return true
  }
  
  // 如果用户没有角色，且菜单需要角色，则无权限
  if (!userRoles || userRoles.length === 0) {
    return false
  }
  
  // 检查用户是否有菜单要求的任一角色（OR 逻辑）
  return menuItem.roles.some(role => userRoles.includes(role))
}

/**
 * 递归过滤菜单，只保留有权限的菜单项
 * @param {Array} menus - 菜单数组
 * @param {Array} userRoles - 用户角色数组
 * @returns {Array} 过滤后的菜单数组
 */
export const filterMenusByRoles = (menus, userRoles = []) => {
  if (!menus || !Array.isArray(menus)) {
    return []
  }
  
  return menus
    .map(menu => {
      // 检查当前菜单是否有权限
      const hasPermission = checkMenuPermission(menu, userRoles)
      
      // 如果有子菜单，递归过滤
      let filteredChildren = []
      if (menu.children && menu.children.length > 0) {
        filteredChildren = filterMenusByRoles(menu.children, userRoles)
      }
      
      // 如果当前菜单有权限，或者有子菜单有权限，则保留
      if (hasPermission || filteredChildren.length > 0) {
        return {
          ...menu,
          children: filteredChildren.length > 0 ? filteredChildren : undefined
        }
      }
      
      return null
    })
    .filter(menu => menu !== null)
}

/**
 * 检查路由是否有权限访问
 * @param {Object} route - 路由对象
 * @param {Array} userRoles - 用户角色数组
 * @returns {Boolean} 是否有权限
 */
export const checkRoutePermission = (route, userRoles = []) => {
  // 从路由 meta 中获取权限要求
  const requiredRoles = route.meta?.roles
  
  // 如果没有配置 roles，默认允许访问
  if (!requiredRoles || !Array.isArray(requiredRoles) || requiredRoles.length === 0) {
    return true
  }
  
  // 如果用户没有角色，且路由需要角色，则无权限
  if (!userRoles || userRoles.length === 0) {
    return false
  }
  
  // 检查用户是否有路由要求的任一角色
  return requiredRoles.some(role => userRoles.includes(role))
}

/**
 * 获取菜单项需要的角色（用于调试）
 * @param {Object} menuItem - 菜单项
 * @returns {Array} 角色数组
 */
export const getMenuRoles = (menuItem) => {
  return menuItem.roles || []
}

