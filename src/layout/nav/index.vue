<template>
  <el-aside :width="$store.state.collapse ? '60px' : '200px'">
    <el-scrollbar>
      <div class="logo">
        <img :src="logo" :width="$store.state.collapse ? '25' : '40'" alt="logo" />
        <p v-show="!$store.state.collapse">订单系统</p>
      </div>
      <el-menu :default-active="currentRoute" background-color="var(--color)" text-color="#fff"
        active-text-color="#fff" :collapse="$store.state.collapse" :collapse-transition="false"
        :router="true" :unique-opened="true" @select="handSelect">
        <NavItemVue :menu="data.menuList"></NavItemVue>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, toRaw, watch, computed } from 'vue'
import NavItemVue from './NavItem.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const logo = ref(require('@/assets/images/logo_s.png'))
let data = reactive({
  menuList: [],
  // currentRoute: '/home', //当前页面路由
  tabsList: {},
})
const instance = getCurrentInstance()
const $api = instance.proxy.$api
$api.home.getMenu().then((res) => {
  data.menuList = res.result
  store.commit('setMenuList', res.result)
})
// menuList = await $api.home.getMenu() //会将组件变为异步组件
const currentRoute = computed(() => store.state.currentRoute)
// let router = useRouter()
// watch(
//   () => router,
//   (newValue, oldValue) => {
//     store.commit('switchCurrentRoute', newValue.currentRoute.value.fullPath)
//   },
//   { immediate: true }
// )
const handSelect = (index, indexPath, item, routeResult) => {}
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
}
</style>