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
    overflow-y: hidden;
    padding: 0;
  }
}
</style>