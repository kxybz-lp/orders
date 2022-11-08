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
          <!-- <router-view /> -->
          <router-view #default="{ route, Component }">
            <transition enter-active-class="animate__animated animate__fadeIn">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Nav from '@/layout/nav/index.vue'
import Header from '@/layout/header/index.vue'
import tagsView from '@/layout/tags/index.vue'
// const $api = internalInstance.proxy.$api
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
