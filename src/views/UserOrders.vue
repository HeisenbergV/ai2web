<template>
  <div class="user-orders">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>我的订单</span>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="productName" label="商品名称" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            <span style="color: var(--el-color-danger)">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(25)

const tableData = ref([
  {
    orderNo: 'ORD20240101001',
    productName: '商品A',
    amount: 199.00,
    status: 'paid',
    createTime: '2024-01-01 10:00:00'
  },
  {
    orderNo: 'ORD20240102002',
    productName: '商品B',
    amount: 299.00,
    status: 'pending',
    createTime: '2024-01-02 10:00:00'
  },
  {
    orderNo: 'ORD20240103003',
    productName: '商品C',
    amount: 399.00,
    status: 'shipped',
    createTime: '2024-01-03 10:00:00'
  }
])

const getStatusType = (status) => {
  const statusMap = {
    pending: 'warning',
    paid: 'success',
    shipped: 'info',
    completed: 'success',
    cancelled: 'danger'
  }
  return statusMap[status] || ''
}

const getStatusText = (status) => {
  const statusMap = {
    pending: '待支付',
    paid: '已支付',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

const handleView = (row) => {
  ElMessage.info(`查看订单: ${row.orderNo}`)
}
</script>

<style scoped lang="scss">
.user-orders {
  .card-header {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>

