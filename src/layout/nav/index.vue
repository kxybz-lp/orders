<template>
  <el-aside :width="$store.state.collapse ? '60px' : '200px'">
    <el-scrollbar>
      <div class="logo">
        <img :src="logo" :width="$store.state.collapse ? '25' : '40'" alt="logo" />
        <p v-show="!$store.state.collapse">订单系统</p>
      </div>
      <el-menu default-active="2" background-color="var(--color)" text-color="#fff"
        active-text-color="#fff" :collapse="$store.state.collapse" :collapse-transition="false">
        <el-menu-item index="1">
          <el-icon>
            <setting />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="1-1">管理员列表</el-menu-item>
          <el-menu-item index="1-2">角色列表</el-menu-item>
          <el-menu-item index="1-3">菜单列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'

const logo = ref(require('@/assets/images/logo_s.png'))
const { useStore } = require('vuex')
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100%;
  background-color: var(--color);
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
  .el-menu-item.is-active {
    background-color: #02333b !important;
    color: #fff !important;
  }
  .el-menu-item:hover,
  :deep(.el-submenu__title:hover) {
    background: #02333b !important;
    color: #fff !important;
  }
}
</style>