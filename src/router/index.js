import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'LayOut',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ '../views/Role.vue'),
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue'),
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

export default router
