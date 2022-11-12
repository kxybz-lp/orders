<template>
  <el-upload
    drag
    :action="uploadImageAction"
    multiple
    :headers="{
      token,
    }"
    name="file"
    :data="data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖到文件至此处或点击上传</div>
    <template #tip>
      <div class="el-upload__tip">支持jpg/png格式文件上传，文件体积小于1M</div>
    </template>
  </el-upload>
</template>
<script setup>
import image from '@/api/image'
import { getToken } from '@/utils/token'
import { toast } from '@/utils/utils'
const token = getToken()
const uploadImageAction = image.uploadImageAction()
defineProps({
  data: Object,
})

const emit = defineEmits(['success'])

const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response)
  emit('success', {
    response,
    uploadFile,
    uploadFiles,
  })
}

const uploadError = (error, uploadFile, uploadFiles) => {
  let msg = JSON.parse(error.message).message || '上传失败'
  toast(msg, 'error')
}
</script>
