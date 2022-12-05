import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import admin from '@/api/admin'
import { removeToken } from '@/utils/token'

export default createStore({
  state: {
    collapse: false,
    isMobile: false,
    token: '',
    adminInfo: null,
    currentRoute: '/', //当前页面路由
    menuList: null,
    tabList: [
      //标签导航
      {
        label: '首页',
        path: '/',
      },
    ],
  },
  getters: {},
  mutations: {
    switchCollapse(state) {
      state.collapse = !state.collapse
    },
    switchIsMobile(state, val) {
      state.isMobile = val
    },
    //设置当前页面路由
    setCurrentRoute(state, val) {
      state.currentRoute = val
    },
    //设置权限菜单
    setMenuList(state, val) {
      state.menuList = val
    },
    //设置权限菜单
    setTabList(state, val) {
      state.tabList = val
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
            let adminInfo = res.result.adminInfo
            adminInfo.auths = adminInfo.auths.split(',').map((o) => parseInt(o))
            commit('setAdminInfo', adminInfo)
            commit('setMenuList', res.result.menu)
            resolve(res.result)
          })
          .catch((err) => reject(err))
      })
    },
    // 退出登录
    logout({ commit }) {
      removeToken()
      commit('setAdminInfo', null)
      // commit('setMenuList', [])
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的token
          tabList: val.tabList,
          currentRoute: val.currentRoute,
          menuList: val.menuList,
          adminInfo: val.adminInfo,
          isMobile: val.isMobile,
        }
      },
    }),
  ],
})
