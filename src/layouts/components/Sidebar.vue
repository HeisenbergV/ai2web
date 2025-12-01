<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="appStore.sidebarCollapse"
    :collapse-transition="false"
    router
    class="sidebar-menu"
  >
    <MenuItem
      v-for="item in menuStore.menuList"
      :key="item.path"
      :menu-item="item"
    />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import MenuItem from './MenuItem.vue'

const route = useRoute()
const appStore = useAppStore()
const menuStore = useMenuStore()

const activeMenu = computed(() => route.path)
</script>

<style scoped lang="scss">
.sidebar-menu {
  border: none;
  height: 100%;
  overflow-y: auto;
  
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>

