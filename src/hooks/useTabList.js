import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useTabList() {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const tabList = computed(() => store.state.tabList)
  const currentRoute = computed(() => store.state.currentRoute)
  // const scrollbar = ref(null)

  // const scrolls = (pos) => {
  //   nextTick(() => {
  //     console.log(scrollbar.value)
  //     // scrollbar.value.scrollTo(pos)
  //   })
  // }

  // 添加标签导航
  const addTab = (tab) => {
    let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1
    if (noTab) {
      tabList.value.push(tab)
    }
    store.commit('setTabList', tabList.value)
  }

  watch(
    route,
    () => {
      addTab({
        label: route.meta.title,
        path: route.path,
      })
      store.commit('setCurrentRoute', route.path)
    },
    { deep: true, immediate: true }
  )
  // 关闭标签导航
  const closeTab = (tag, index) => {
    let tab = tabList.value
    let length = tab.length - 1
    tabList.value.splice(index, 1)
    store.commit('setTabList', tabList.value)
    // 如果关闭的标签不是当前路由的话，就不跳转
    if (tag.path !== currentRoute.value) {
      return
    }

    // 关闭的标签是最右边的话，往左边跳转一个
    if (index === length) {
      router.push(tab[index - 1].path)
    } else {
      // 否则往右边跳转
      router.push(tab[index].path)
    }
  }
  const changeMenu = (tag) => {
    router.push(tag.path).catch((err) => err) //catch解决重复点击报错
    // store.commit('selectMenu', tag)
  }
  const handleCommand = (command) => {
    let tab = tabList.value
    switch (command) {
      case 'other':
        // 过滤只剩下首页和当前激活
        tab = tabList.value.filter((tab) => tab.path == '/' || tab.path == currentRoute.value)
        break
      case 'all':
        // 切换回首页
        router.push('/')
        tab = [
          {
            label: '首页',
            path: '/',
          },
        ]
        break
    }
    store.commit('setTabList', tab)
  }

  return {
    currentRoute,
    tabList,
    closeTab,
    changeMenu,
    handleCommand,
  }
}
