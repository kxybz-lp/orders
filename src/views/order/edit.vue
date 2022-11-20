<template>
  <div class="app-container">
    <el-card class="menu-order-add" shadow="hover">
      订单编辑
      <el-button @click="goto">关闭当前并跳转</el-button>
    </el-card>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const router = useRouter()
const store = useStore()

console.log(route.params.id)
const tabList = store.state.tabList
const goto = () => {
  let index = tabList.findIndex((item) => item.path == '/order/add')
  router.replace('/order/index')
  tabList.splice(index, 1)
  store.commit('setTabList', tabList)
}
</script>
<style lang="scss" scoped></style>
