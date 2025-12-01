<template>
  <div class="common-table">
    <el-table
      :data="tableData"
      v-bind="$attrs"
      style="width: 100%"
    >
      <slot></slot>
    </el-table>
    
    <div v-if="showPagination" class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  }
})

const emit = defineEmits(['page-change', 'size-change'])

const currentPage = ref(1)
const pageSize = ref(10)

const handleSizeChange = (val) => {
  pageSize.value = val
  emit('size-change', { page: currentPage.value, size: val })
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  emit('page-change', { page: val, size: pageSize.value })
}

watch(() => props.total, () => {
  if (props.total === 0) {
    currentPage.value = 1
  }
})
</script>

<style scoped lang="scss">
.common-table {
  .pagination-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

