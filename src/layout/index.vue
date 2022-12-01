<template>
  <div class="layout-common">
    <el-container>
      <Nav></Nav>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-main>
          <tagsView></tagsView>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Nav from '@/layout/nav/index.vue'
import Header from '@/layout/header/index.vue'
import tagsView from '@/layout/tags/index.vue'
import { getCurrentInstance } from 'vue'
const internalInstance = getCurrentInstance()
// const $api = internalInstance.proxy.$api
// console.log($api)
// ElMessage({
//   message: '你错拉！！！' || 'Error',
//   type: 'error',
//   duration: 5 * 1000,
// })
// ElMessageBox.confirm('You have been logged out,  or log in again', 'Confirm logout', {
//   confirmButtonText: 'Re-Login',
//   cancelButtonText: 'Cancel',
//   type: 'warning',
// }).then(() => {})
</script>

<style lang="scss" scoped>
.layout-common {
  height: 100%;
  overflow: hidden;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #fff;
    box-sizing: border-box;
    color: #0c0c0c;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-main {
    background-color: #f0f2f5;
    overflow-y: auto;
    padding: 0;
  }
  .el-main::-webkit-scrollbar-track-piece {
    background-color: rgba(255, 255, 255, 0.6);
  }
  .el-main::-webkit-scrollbar {
    width: 5px !important;
    height: 3px;
  }
  .el-main::-webkit-scrollbar-thumb {
    background-color: #999;
    background-clip: padding-box;
    min-height: 28px;
    overflow-x: hidden;
  }
  .el-main::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }
}
</style>