<template>
  <div class="user-profile">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人资料</span>
        </div>
      </template>

      <el-form :model="form" label-width="100px" style="max-width: 600px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="角色">
          <el-tag v-for="role in userStore.roles" :key="role" style="margin-right: 8px">
            {{ role }}
          </el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const form = ref({
  username: '',
  email: '',
  phone: ''
})

const originalForm = ref({})

onMounted(() => {
  // 模拟加载用户信息
  form.value = {
    username: userStore.userInfo?.username || 'user',
    email: 'user@example.com',
    phone: '13800138000'
  }
  originalForm.value = { ...form.value }
})

const handleSave = () => {
  ElMessage.success('保存成功')
  originalForm.value = { ...form.value }
}

const handleReset = () => {
  form.value = { ...originalForm.value }
  ElMessage.info('已重置')
}
</script>

<style scoped lang="scss">
.user-profile {
  .card-header {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>

