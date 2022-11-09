<!-- 全局抽屉组件 -->
<template>
  <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="false">
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button size="small" type="primary" color="#004c59" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button size="small" type="default" @click="closeDrawer">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%',
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: '提交',
  },
})

const showDrawer = ref(false)
const loading = ref(false)
const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)

// 打开
const openDrawer = () => (showDrawer.value = true)

// 关闭
const closeDrawer = () => (showDrawer.value = false)

// 提交
const emit = defineEmits(['submit'])
const submit = () => emit('submit')

defineExpose({
  openDrawer,
  closeDrawer,
  showLoading,
  hideLoading,
})
</script>
<style lang="scss" scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.formDrawer .actions {
  height: 50px;
  margin-top: auto;
  display: flex;
  align-items: center;
}
</style>
