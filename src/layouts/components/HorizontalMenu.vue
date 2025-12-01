<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    router
    class="horizontal-menu"
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
import { useMenuStore } from '@/stores/menu'
import MenuItem from './MenuItem.vue'

const route = useRoute()
const menuStore = useMenuStore()

const activeMenu = computed(() => route.path)
</script>

<style scoped lang="scss">
.horizontal-menu {
  border: none;
  background: transparent;
}
</style>

