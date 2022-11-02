<template>
  <div class="tabs">
    <el-tag :key="tag.path" type="info" size="small" v-for="(tag, index) in tabsList"
      :closable="tag.name !== 'Home'" :disable-transitions="false" @close="handleClose(tag, index)"
      @click="changeMenu(tag)" :effect="currentRoute === tag.path ? 'dark' : 'plain'">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const tabsList = computed(() => store.state.tabsList)
const currentRoute = computed(() => store.state.currentRoute)

const handleClose = (tag, index) => {
  let tab = tabsList.value
  let length = tab.length - 1
  store.commit('closeTab', tag)
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
  router.push({ name: tag.name }).catch((err) => err) //catch解决重复点击报错
  store.commit('selectMenu', tag)
}
</script>

<style lang="scss" scoped>
.el-tag {
  border-radius: 0;
  cursor: pointer;
  min-width: 80px;
  text-align: center;
  background: #fff;
}
.el-tag.el-tag--info {
  background: #fff;
  border: none;
  border-right: none;
}
.el-tag--dark.el-tag--info {
  color: var(--color) !important;
  background-color: #f0f2f5;
  border-top: 1px solid var(--color);
}
.el-tag--dark.el-tag--info:deep(.el-tag__close) {
  color: var(--color) !important;
}
.el-tag--medium {
  line-height: 28px;
}
</style>