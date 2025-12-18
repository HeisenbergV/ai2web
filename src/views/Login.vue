<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>登录</h2>
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { getMenuConfig } from '@/utils/menu'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

const form = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  // 模拟登录逻辑
  // 实际项目中应该调用登录 API
  try {
    // 模拟根据用户名设置不同角色
    let userRoles = ['user'] // 默认普通用户
    
    if (form.value.username === 'admin') {
      userRoles = ['admin'] // 管理员
    } else if (form.value.username === 'editor') {
      userRoles = ['editor', 'user'] // 编辑者（可以有多个角色）
    }
    
    // 登录，设置用户信息和角色
    userStore.login({
      token: 'mock-token-' + Date.now(),
      userInfo: {
        username: form.value.username,
        roles: userRoles
      },
      roles: userRoles
    })
    
    // 重新加载菜单（根据角色过滤）
    const menuConfig = getMenuConfig()
    menuStore.reloadMenu(menuConfig, userRoles)
    
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请重试')
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .login-card {
    width: 400px;
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>

