<template>
  <div class="layout-container" :class="layoutClass">
    <!-- 经典布局 -->
    <template v-if="appStore.layout === 'classic'">
      <ClassicLayout />
    </template>
    
    <!-- 水平布局 -->
    <template v-else-if="appStore.layout === 'horizontal'">
      <HorizontalLayout />
    </template>
    
    <!-- 垂直布局 -->
    <template v-else-if="appStore.layout === 'vertical'">
      <VerticalLayout />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import ClassicLayout from './components/ClassicLayout.vue'
import HorizontalLayout from './components/HorizontalLayout.vue'
import VerticalLayout from './components/VerticalLayout.vue'

const appStore = useAppStore()

const layoutClass = computed(() => {
  return {
    'layout-classic': appStore.layout === 'classic',
    'layout-horizontal': appStore.layout === 'horizontal',
    'layout-vertical': appStore.layout === 'vertical'
  }
})
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
}
</style>

