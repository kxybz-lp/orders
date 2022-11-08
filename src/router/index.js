import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '@/views/home/index.vue'
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
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/index.vue'),
            meta: { title: '管理员列表', permissions: true },
          },
          {
            path: '/admin/role',
            name: 'Role',
            component: () => import(/* webpackChunkName: "role" */ '@/views/role/index.vue'),
            meta: { title: '角色列表', permissions: true },
          },
        ],
      },
      {
        path: '/system',
        name: 'System',
        meta: { title: '系统管理', permissions: true },
        children: [
          {
            path: '/system/menu',
            name: 'Menu',
            component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/index.vue'),
            meta: { title: '菜单列表', permissions: true },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { title: '登录', permissions: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '@/views/other/404.vue'),
    meta: { title: '404', permissions: false },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
