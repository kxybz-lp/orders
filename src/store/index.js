import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import admin from '@/api/admin'
import { removeToken } from '@/utils/token'

export default createStore({
  state: {
    collapse: false,
    token: '',
    adminInfo: null,
    currentRoute: '/home', //当前页面路由
    menuList: [],
    tabsList: [
      //标签导航
      {
        name: 'Home',
        label: '首页',
        icon: 'HomeFilled',
        path: '/home',
      },
    ],
  },
  getters: {},
  mutations: {
    switchCollapse(state) {
      state.collapse = !state.collapse
    },
    //设置当前页面路由
    switchCurrentRoute(state, val) {
      state.currentRoute = val
    },
    //设置权限菜单
    setMenuList(state, val) {
      state.menuList = val
    },
    //选择标签
    selectMenu(state, val) {
      if (val.path === '/home' || val.path === '/') {
        state.currentRoute = '/home'
      } else {
        state.currentRoute = val.path
        let result = state.tabsList.findIndex((item) => item.path === val.path)
        result === -1 ? state.tabsList.push(val) : ''
      }
    },

    //关闭标签
    closeTab(state, val) {
      let index = state.tabsList.findIndex((item) => item.name === val.name)
      state.tabsList.splice(index, 1)
    },
    pushtags(state, val) {
      let result = state.tabsList.findIndex((item) => item.name === val.name)
      result === -1 ? state.tabsList.push(val) : ''
    },
    //设置登录管理员账号信息
    setAdminInfo(state, val) {
      state.adminInfo = val
    },
  },
  actions: {
    // 获取当前登录用户信息
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        admin
          .getInfo()
          .then((res) => {
            commit('setAdminInfo', res.result)
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    // 退出登录
    logout({ commit }) {
      removeToken()
      commit('setAdminInfo', null)
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的token
          tabsList: val.tabsList,
          currentRoute: val.currentRoute,
          menuList: val.menuList,
          adminInfo: val.adminInfo,
        }
      },
    }),
  ],
})
