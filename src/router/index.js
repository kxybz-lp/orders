import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
import Layout from '../layout/index.vue'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'LayOut',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '数据概览', permissions: true },
      },
      {
        path: '',
        name: 'Admins',
        meta: { title: '用户管理' },
        path: '/admin',
        redirect: '/admin/index',
        children: [
          {
            path: '/admin/index',
            name: 'Admin',
            component: () => import(/* webpackChunkName: "admin" */ '../views/admin/index.vue'),
            meta: { title: '管理员列表', permissions: true },
          },
          {
            path: '/admin/role',
            name: 'Role',
            component: () => import(/* webpackChunkName: "role" */ '../views/Role.vue'),
            meta: { title: '角色列表', permissions: true },
          },
          {
            path: '/admin/menu',
            name: 'Menu',
            component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue'),
            meta: { title: '菜单列表', permissions: true },
          },
        ],
      },
      {
        path: '/award',
        name: 'Award',
        component: () => import(/* webpackChunkName: "award" */ '../views/Award.vue'),
        meta: { title: '抽奖列表', permissions: true },
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  //console.log(store)
  //store.commit('switchCurrentRoute', to.fullPath)
})

export default router
