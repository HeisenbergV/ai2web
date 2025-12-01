<template>
  <div class="request-demo">
    <el-card>
      <template #header>
        <span>请求封装</span>
      </template>
      
      <el-alert
        title="统一的 API 请求处理"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <div class="demo-section">
        <h3>请求工具使用示例</h3>
        
        <el-space wrap>
          <el-button type="primary" @click="handleGetRequest">
            <el-icon><Download /></el-icon>
            GET 请求
          </el-button>
          <el-button type="success" @click="handlePostRequest">
            <el-icon><Upload /></el-icon>
            POST 请求
          </el-button>
          <el-button type="warning" @click="handlePutRequest">
            <el-icon><Edit /></el-icon>
            PUT 请求
          </el-button>
          <el-button type="danger" @click="handleDeleteRequest">
            <el-icon><Delete /></el-icon>
            DELETE 请求
          </el-button>
        </el-space>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>请求结果</h3>
        <el-card v-if="requestResult">
          <pre>{{ JSON.stringify(requestResult, null, 2) }}</pre>
        </el-card>
        <el-empty v-else description="点击上方按钮发送请求" />
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>代码示例</h3>
        <el-tabs>
          <el-tab-pane label="GET 请求">
            <pre><code>import request from '@/utils/request'

// GET 请求
request.get('/api/users')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })</code></pre>
          </el-tab-pane>
          <el-tab-pane label="POST 请求">
            <pre><code>import request from '@/utils/request'

// POST 请求
request.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })</code></pre>
          </el-tab-pane>
          <el-tab-pane label="请求拦截器">
            <pre><code>// 自动添加 token
const token = localStorage.getItem('token')
if (token) {
  config.headers.Authorization = `Bearer ${token}`
}</code></pre>
          </el-tab-pane>
          <el-tab-pane label="响应拦截器">
            <pre><code>// 统一处理响应
if (res.code !== undefined && res.code !== 200) {
  ElMessage.error(res.message || '请求失败')
  return Promise.reject(new Error(res.message))
}
return res</code></pre>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>功能特性</h3>
        <ul>
          <li>统一的请求基础 URL 配置</li>
          <li>自动添加 Authorization token</li>
          <li>统一的错误处理和提示</li>
          <li>支持请求和响应拦截器</li>
          <li>支持 GET、POST、PUT、DELETE 等请求方法</li>
          <li>统一的超时时间配置</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Download, Upload, Edit, Delete } from '@element-plus/icons-vue'
import request from '@/utils/request'

const requestResult = ref(null)

const handleGetRequest = async () => {
  try {
    // 模拟 GET 请求
    requestResult.value = {
      method: 'GET',
      url: '/api/users',
      message: 'GET 请求成功',
      data: { id: 1, name: '示例用户' }
    }
    ElMessage.success('GET 请求成功')
  } catch (error) {
    ElMessage.error('请求失败')
  }
}

const handlePostRequest = async () => {
  try {
    // 模拟 POST 请求
    requestResult.value = {
      method: 'POST',
      url: '/api/users',
      message: 'POST 请求成功',
      data: { id: 2, name: '新用户', email: 'new@example.com' }
    }
    ElMessage.success('POST 请求成功')
  } catch (error) {
    ElMessage.error('请求失败')
  }
}

const handlePutRequest = async () => {
  try {
    // 模拟 PUT 请求
    requestResult.value = {
      method: 'PUT',
      url: '/api/users/1',
      message: 'PUT 请求成功',
      data: { id: 1, name: '更新后的用户' }
    }
    ElMessage.success('PUT 请求成功')
  } catch (error) {
    ElMessage.error('请求失败')
  }
}

const handleDeleteRequest = async () => {
  try {
    // 模拟 DELETE 请求
    requestResult.value = {
      method: 'DELETE',
      url: '/api/users/1',
      message: 'DELETE 请求成功'
    }
    ElMessage.success('DELETE 请求成功')
  } catch (error) {
    ElMessage.error('请求失败')
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.request-demo {
  .demo-section {
    @include demo-section;

    pre {
      @include code-block;
      max-height: 300px;
      overflow-y: auto;
    }
  }
}
</style>

