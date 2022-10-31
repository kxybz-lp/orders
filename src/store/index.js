import { createStore } from 'vuex'

export default createStore({
  state: {
    collapse: false,
  },
  getters: {},
  mutations: {
    switchCollapse(state) {
      state.collapse = !state.collapse
    },
  },
  actions: {},
  modules: {},
})
