<template>
  <div class="layout-common">
    <el-container>
      <Nav></Nav>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-main>
          <div class="main">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Nav from '@/layout/nav/index.vue'
import Header from '@/layout/header/index.vue'
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
  .main {
    height: 100%;
    overflow-y: auto;
    background: #f0f2f5;
  }
  .main::-webkit-scrollbar-track-piece {
    background-color: rgba(255, 255, 255, 0.6);
  }
  .main::-webkit-scrollbar {
    width: 5px !important;
    height: 3px;
  }
  .main::-webkit-scrollbar-thumb {
    background-color: #999;
    background-clip: padding-box;
    min-height: 28px;
    overflow-x: hidden;
  }
  .main::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }
}
</style>