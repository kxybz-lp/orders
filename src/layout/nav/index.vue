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
data.menuList = [
  {
    id: 1,
    pid: 0,
    name: 'Home', //运营概览
    label: '首页',
    icon: 'HomeFilled',
    path: '/home',
    meta: { title: '数据概览', permissions: true },
  },
  {
    id: 2,
    pid: 0,
    name: 'Admins',
    label: '用户管理',
    icon: 'UserFilled',
    path: '/admin', //为空会导致el-menu的unique-opened属性无效
    children: [
      {
        id: 21,
        pid: 2,
        name: 'Admin',
        label: '管理员列表',
        path: '/admin/index',
        meta: { title: '管理员列表', permissions: true },
      },
      {
        id: 22,
        pid: 2,
        name: 'Role',
        label: '角色列表',
        path: '/admin/role',
        meta: { title: '角色列表', permissions: true },
      },
    ],
  },
  {
    id: 3,
    pid: 0,
    name: 'orders',
    label: '订单管理',
    icon: 'List',
    path: '/orders',
    children: [
      {
        id: 31,
        pid: 3,
        name: 'Order',
        label: '订单列表',
        path: '/order',
      },
      {
        id: 32,
        pid: 3,
        name: 'Channel',
        label: '渠道管理',
        path: '/channel',
      },
      {
        id: 33,
        pid: 3,
        name: 'Status',
        label: '状态管理',
        path: '/status',
      },
      {
        id: 34,
        pid: 3,
        name: 'Tags',
        label: '标签管理',
        path: '/tags',
      },
      {
        id: 35,
        pid: 3,
        name: 'Type',
        label: '类型管理',
        path: '/type',
      },
      {
        id: 36,
        pid: 3,
        name: 'Layout',
        label: '户型管理',
        path: '/layout',
      },
    ],
  },
  {
    id: 4,
    pid: 0,
    name: 'Award',
    label: '抽奖管理',
    icon: 'Coin',
    path: '/award',
  },
  {
    id: 5,
    pid: 0,
    name: 'System',
    label: '系统管理',
    icon: 'Tools',
    path: '/system',
    children: [
      {
        id: 51,
        pid: 5,
        name: 'Category',
        label: '分类列表',
        path: '/category',
      },
      {
        id: 52,
        pid: 5,
        name: 'News',
        label: '资讯列表',
        path: '/news',
      },
      {
        id: 53,
        pid: 5,
        name: 'Menu',
        label: '菜单列表',
        path: '/admin/menu',
        meta: { title: '菜单列表', permissions: true },
      },
    ],
  },
]
// $api.home.getMenu().then((res) => {
//   data.menuList = res.result
//   store.commit('setMenuList', res.result)
// })
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