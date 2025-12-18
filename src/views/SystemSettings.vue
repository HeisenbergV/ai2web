<template>
  <div class="system-settings">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="basicForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="系统名称">
              <el-input v-model="basicForm.systemName" />
            </el-form-item>
            <el-form-item label="系统描述">
              <el-input v-model="basicForm.systemDesc" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="Logo">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveBasic">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securityForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="密码最小长度">
              <el-input-number v-model="securityForm.minPasswordLength" :min="6" :max="20" />
            </el-form-item>
            <el-form-item label="登录失败次数">
              <el-input-number v-model="securityForm.maxLoginAttempts" :min="3" :max="10" />
            </el-form-item>
            <el-form-item label="会话超时时间">
              <el-input-number v-model="securityForm.sessionTimeout" :min="30" :max="480" />
              <span style="margin-left: 10px">分钟</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveSecurity">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="通知设置" name="notification">
          <el-form :model="notificationForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="邮件通知">
              <el-switch v-model="notificationForm.emailEnabled" />
            </el-form-item>
            <el-form-item label="短信通知">
              <el-switch v-model="notificationForm.smsEnabled" />
            </el-form-item>
            <el-form-item label="系统通知">
              <el-switch v-model="notificationForm.systemEnabled" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveNotification">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const activeTab = ref('basic')

const basicForm = ref({
  systemName: 'AI to Web',
  systemDesc: '基于 Vue3 的后台管理框架'
})

const securityForm = ref({
  minPasswordLength: 8,
  maxLoginAttempts: 5,
  sessionTimeout: 120
})

const notificationForm = ref({
  emailEnabled: true,
  smsEnabled: false,
  systemEnabled: true
})

const handleSaveBasic = () => {
  ElMessage.success('基本设置保存成功')
}

const handleSaveSecurity = () => {
  ElMessage.success('安全设置保存成功')
}

const handleSaveNotification = () => {
  ElMessage.success('通知设置保存成功')
}
</script>

<style scoped lang="scss">
.system-settings {
  .card-header {
    font-size: 18px;
    font-weight: 600;
  }

  .avatar-uploader {
    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: var(--el-text-color-placeholder);
      width: 178px;
      height: 178px;
      text-align: center;
      line-height: 178px;
    }
  }
}
</style>

