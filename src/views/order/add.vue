<template>
  <div class="app-container">
    <el-card class="menu-order-add" shadow="hover">
      <p>订单新增</p>
      <el-button @click="goto">关闭当前并跳转</el-button>
    </el-card>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const tabList = store.state.tabList
const goto = () => {
  let index = tabList.findIndex((item) => item.path == '/order/add')
  router.replace('/order/index')
  tabList.splice(index, 1)
  store.commit('setTabList', tabList)
}
</script>
<style lang="scss" scoped></style>
