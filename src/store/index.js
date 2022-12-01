import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    collapse: false,
    token: '',
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
      //根据当前路由设置面包屑导航
      // console.log(state.menuList.filter((item) => item.path === val))
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
        //如果等于-1说明tabsList不存在那么插入，否则什么都不做
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
      //如果等于-1说明tabs不存在那么插入，否则什么都不做
      //findindex找角标，循环判断一下，如果等于那么就代表有相同的，就不必添加，如果找不到那就是-1.就添加
      let result = state.tabsList.findIndex((item) => item.name === val.name)
      result === -1 ? state.tabsList.push(val) : ''
    },
  },
  actions: {},
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
        }
      },
    }),
  ],
})
