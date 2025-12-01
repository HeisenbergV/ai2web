<template>
  <div class="table-demo">
    <el-card>
      <template #header>
        <span>公共组件 - Table、分页</span>
      </template>
      
      <el-alert
        title="Table、分页等组件化"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <div class="demo-section">
        <h3>CommonTable 组件演示</h3>
        <p>这是一个封装的表格组件，内置了分页功能，使用简单方便。</p>
        
        <CommonTable
          :table-data="tableData"
          :total="total"
          @page-change="handlePageChange"
          @size-change="handleSizeChange"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="role" label="角色" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag :type="row.status === '启用' ? 'success' : 'danger'">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default>
              <el-button type="primary" size="small" link>编辑</el-button>
              <el-button type="danger" size="small" link>删除</el-button>
            </template>
          </el-table-column>
        </CommonTable>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>代码示例</h3>
        <el-tabs>
          <el-tab-pane label="模板">
            <pre><code>&lt;CommonTable
  :table-data="tableData"
  :total="total"
  @page-change="handlePageChange"
  @size-change="handleSizeChange"
&gt;
  &lt;el-table-column prop="id" label="ID" /&gt;
  &lt;el-table-column prop="name" label="姓名" /&gt;
&lt;/CommonTable&gt;</code></pre>
          </el-tab-pane>
          <el-tab-pane label="脚本">
            <pre><code>import CommonTable from '@/components/CommonTable/index.vue'

const tableData = ref([])
const total = ref(0)

const handlePageChange = ({ page, size }) => {
  // 处理页码变化
}

const handleSizeChange = ({ page, size }) => {
  // 处理每页条数变化
}</code></pre>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>组件特性</h3>
        <ul>
          <li>内置分页功能，支持自定义每页条数</li>
          <li>支持表格列的自定义渲染</li>
          <li>提供页码变化和每页条数变化事件</li>
          <li>统一的样式和交互体验</li>
          <li>支持 Element Plus Table 的所有属性</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonTable from '@/components/CommonTable/index.vue'

const tableData = ref([])
const total = ref(0)

// 模拟数据
onMounted(() => {
  tableData.value = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '启用' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '用户', status: '启用' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑', status: '启用' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '用户', status: '启用' }
  ]
  total.value = 50 // 模拟总数
})

const handlePageChange = ({ page, size }) => {
  console.log('页码变化:', page, size)
  // 这里可以调用 API 获取对应页的数据
  // 例如：fetchData({ page, size })
}

const handleSizeChange = ({ page, size }) => {
  console.log('每页条数变化:', page, size)
  // 这里可以调用 API 获取对应页的数据
  // 例如：fetchData({ page, size })
}
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.table-demo {
  .demo-section {
    @include demo-section;

    pre {
      @include code-block;
    }
  }
}
</style>

