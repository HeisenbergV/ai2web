import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref(null)
  
  // Token
  const token = ref('')
  
  // 用户角色（数组，支持多个角色）
  const roles = ref([])
  
  // 是否已登录
  const isLoggedIn = computed(() => !!token.value)
  
  // 是否为管理员（通用角色判断）
  const isAdmin = computed(() => {
    return roles.value.includes('admin')
  })
  
  // 设置用户信息
  const setUserInfo = (info) => {
    userInfo.value = info
    // 如果用户信息中包含角色，自动设置
    if (info && info.roles) {
      roles.value = Array.isArray(info.roles) ? info.roles : [info.roles]
    }
    // 持久化用户信息
    if (info) {
      localStorage.setItem('userInfo', JSON.stringify(info))
    } else {
      localStorage.removeItem('userInfo')
    }
  }
  
  // 设置 Token
  const setToken = (val) => {
    token.value = val
    if (val) {
      localStorage.setItem('token', val)
    } else {
      localStorage.removeItem('token')
    }
  }
  
  // 设置角色
  const setRoles = (roleList) => {
    roles.value = Array.isArray(roleList) ? roleList : [roleList]
    localStorage.setItem('roles', JSON.stringify(roles.value))
  }
  
  // 检查用户是否有指定角色
  const hasRole = (role) => {
    if (!role) return true // 没有配置角色要求，默认允许
    const roleList = Array.isArray(role) ? role : [role]
    return roleList.some(r => roles.value.includes(r))
  }
  
  // 检查用户是否有任一角色（用于多角色权限）
  const hasAnyRole = (roleList) => {
    if (!roleList || roleList.length === 0) return true
    return roleList.some(role => roles.value.includes(role))
  }
  
  // 检查用户是否有所有角色（用于多角色权限）
  const hasAllRoles = (roleList) => {
    if (!roleList || roleList.length === 0) return true
    return roleList.every(role => roles.value.includes(role))
  }
  
  // 登录
  const login = (loginData) => {
    const { token: newToken, userInfo: info, roles: userRoles } = loginData
    
    if (newToken) {
      setToken(newToken)
    }
    
    if (info) {
      setUserInfo(info)
    }
    
    if (userRoles) {
      setRoles(userRoles)
    }
  }
  
  // 登出
  const logout = () => {
    userInfo.value = null
    token.value = ''
    roles.value = []
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('roles')
  }
  
  // 初始化（从 localStorage 恢复）
  const init = () => {
    const savedToken = localStorage.getItem('token')
    const savedUserInfo = localStorage.getItem('userInfo')
    const savedRoles = localStorage.getItem('roles')
    
    if (savedToken) {
      token.value = savedToken
    }
    
    if (savedUserInfo) {
      try {
        userInfo.value = JSON.parse(savedUserInfo)
        // 如果用户信息中有角色，也设置
        if (userInfo.value && userInfo.value.roles) {
          roles.value = Array.isArray(userInfo.value.roles) 
            ? userInfo.value.roles 
            : [userInfo.value.roles]
        }
      } catch (e) {
        console.error('解析用户信息失败:', e)
      }
    }
    
    if (savedRoles) {
      try {
        roles.value = JSON.parse(savedRoles)
      } catch (e) {
        console.error('解析角色信息失败:', e)
      }
    }
  }
  
  return {
    userInfo,
    token,
    roles,
    isLoggedIn,
    isAdmin,
    setUserInfo,
    setToken,
    setRoles,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    login,
    logout,
    init
  }
})

