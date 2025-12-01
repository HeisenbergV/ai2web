<template>
  <div class="user-list">
    <el-card>
      <template #header>
        <span>用户列表</span>
      </template>
      
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
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </CommonTable>
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
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' }
  ]
  total.value = 3
})

const handlePageChange = ({ page, size }) => {
  console.log('页码变化:', page, size)
  // 这里可以调用API获取数据
}

const handleSizeChange = ({ page, size }) => {
  console.log('每页条数变化:', page, size)
  // 这里可以调用API获取数据
}
</script>

<style scoped lang="scss">
.user-list {
}
</style>

