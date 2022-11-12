<template>
  <el-aside :width="$store.state.collapse ? '60px' : '200px'">
    <el-scrollbar>
      <div class="logo">
        <img :src="logo" :width="$store.state.collapse ? '25' : '40'" alt="logo" />
        <p v-show="!$store.state.collapse">订单系统</p>
      </div>
      <el-menu
        :default-active="currentRoute"
        background-color="var(--color)"
        text-color="#fff"
        active-text-color="#fff"
        :collapse="$store.state.collapse"
        :collapse-transition="false"
        :router="true"
        :unique-opened="true"
      >
        <NavItem :menu="menuList"></NavItem>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { computed } from 'vue'
import NavItem from './NavItem.vue'
import { useStore } from 'vuex'
const store = useStore()
const logo = require('@/assets/images/logo_s.png')
const menuList = computed(() => store.state.menuList)
const currentRoute = computed(() => store.state.currentRoute)
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100%;
  background-color: var(--color);
  transition: all 0.2s;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 15px 0;
    cursor: pointer;
    p {
      padding-left: 12px;
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>
