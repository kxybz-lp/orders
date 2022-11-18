<template>
  <el-upload
    class="upload-import"
    action="/api/order/branch/import"
    :headers="{
      token,
    }"
    name="file"
    :before-upload="uploadBefore"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-button type="success" size="small">导入</el-button>
  </el-upload>
</template>
<script setup>
import { toast, elLoading, closeElLoading } from '@/utils/utils'
import { getToken } from '@/utils/token'
const token = getToken()
const uploadBefore = () => {
  elLoading('数据导入中...')
}

const emit = defineEmits(['success'])
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  toast('数据上传成功')
  closeElLoading()
  emit('success', {
    response,
    uploadFile,
    uploadFiles,
  })
}

const uploadError = (error, uploadFile, uploadFiles) => {
  let msg = JSON.parse(error.message).message || '上传失败'
  closeElLoading()
  toast(msg, 'error')
}
</script>
<style lang="scss" scoped>
.upload-import {
  display: inline-block;
  margin: 0 12px;
}
:deep(.el-upload-list) {
  display: none;
}
</style>
