<template>
  <div class="user-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">添加用户</el-button>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            <el-tag>{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(50)

const tableData = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: 'user',
    createTime: '2024-01-02 10:00:00'
  },
  {
    id: 3,
    username: 'editor1',
    email: 'editor1@example.com',
    role: 'editor',
    createTime: '2024-01-03 10:00:00'
  }
])

const handleAdd = () => {
  ElMessage.info('添加用户功能')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑用户: ${row.username}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除用户 ${row.username} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<style scoped lang="scss">
.user-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>

