<template>
  <div class="header-left">
    <el-icon @click="switchCollapse">
      <expand v-if="collapse" />
      <fold v-else />
    </el-icon>
    <BreadCrumbVue></BreadCrumbVue>
  </div>
  <div class="header-right">
    <el-icon @click="switchFull">
      <copy-document v-if="full" />
      <full-screen v-else />
    </el-icon>
    <el-dropdown>
      <span class="el-dropdown-link">
        西双版纳公司
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, getCurrentInstance, ref } from 'vue'
import BreadCrumbVue from './BreadCrumb.vue'

const { useStore } = require('vuex')

const collapse = computed(() => store.state.collapse)
const internalInstance = getCurrentInstance()

const store = useStore()
const data = reactive({
  full: false,
})
const { full } = toRefs(data)
//console.log(full.value)
const switchCollapse = () => {
  store.commit('switchCollapse')
}
// const $utils = internalInstance.appContext.config.globalProperties.$utils
const $utils = internalInstance.proxy.$utils
const switchFull = () => {
  $utils.handleFullScreen(data.full)
  full.value = !full.value
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  &-left {
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 10px;
    }
  }
  .el-icon {
    font-size: 16px;
    color: var(--color);
    cursor: pointer;
  }
  .el-dropdown {
    margin-left: 15px;
    cursor: pointer;
    .el-dropdown-link {
      position: relative;
      top: -3px;
      .el-icon--right {
        position: relative;
        top: 3px;
      }
    }
  }
}
</style>