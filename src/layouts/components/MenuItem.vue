<template>
  <el-sub-menu v-if="menuItem.children && menuItem.children.length > 0" :index="menuItem.path">
    <template #title>
      <el-icon v-if="menuItem.icon">
        <component :is="menuItem.icon" />
      </el-icon>
      <span>{{ menuItem.title }}</span>
    </template>
    <MenuItem
      v-for="child in menuItem.children"
      :key="child.path"
      :menu-item="child"
    />
  </el-sub-menu>
  
  <el-menu-item v-else :index="menuItem.path" :disabled="menuItem.disabled">
    <el-icon v-if="menuItem.icon">
      <component :is="menuItem.icon" />
    </el-icon>
    <template #title>{{ menuItem.title }}</template>
  </el-menu-item>
</template>

<script setup>
defineProps({
  menuItem: {
    type: Object,
    required: true
  }
})
</script>

