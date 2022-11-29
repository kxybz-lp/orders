<template>
  <div class="header-left">
    <el-icon @click="$store.commit('switchCollapse')">
      <expand v-if="$store.state.collapse" />
      <fold v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon @click="refresh"><Refresh /></el-icon>
    </el-tooltip>
    <BreadCrumbVue></BreadCrumbVue>
  </div>
  <div class="header-right">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon @click="switchFull">
        <copy-document v-if="full" />
        <full-screen v-else />
      </el-icon>
    </el-tooltip>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.state.adminInfo?.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="password">修改密码</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/admin/wechat')">绑定微信</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <FormDrawer ref="formDrawerRef" title="修改密码" :close-on-click-modal="false" @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import { ref } from 'vue'
import BreadCrumbVue from './BreadCrumb.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import { useRepassword, useLogout } from '@/hooks/useAdmin'
import { handleFullScreen } from '@/utils/utils'
const full = ref(false)

const { formDrawerRef, formRef, form, rules, password, onSubmit } = useRepassword()
const { logout } = useLogout()

const refresh = () => {
  location.reload()
}

const handleCommand = (command) => {
  switch (command) {
    case 'logout':
      logout()
      break
    case 'password':
      password()
      break
    case 'wechat':
      console.log('wechatj')
      break
  }
}
// const $utils = internalInstance.appContext.config.globalProperties.$utils
const switchFull = () => {
  handleFullScreen(full.value)
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
