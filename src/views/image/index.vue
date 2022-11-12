<template>
  <el-container class="image-container" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button color="var(--color)" size="small" @click="handleOpenCreate">新增分类</el-button>
      <el-button type="warning" size="small" @click="handleOpenUpload">图片上传</el-button>
    </el-header>
    <el-container :style="{ height: vh + 'px' }">
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange"></ImageAside>
      <ImageMain ref="ImageMainRef"></ImageMain>
    </el-container>
  </el-container>
</template>
<script setup>
import ImageAside from '@/components/image/ImageAside.vue'
import ImageMain from '@/components/image/ImageMain.vue'
import { ref } from 'vue'
// 设置组件全屏高度
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 60 - 25 - 30
const vh = h - 60

const ImageAsideRef = ref(null)
const ImageMainRef = ref(null)
// 新增图片分类,调用子类暴露的方法
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
const handleAsideChange = (class_id) => {
  ImageMainRef.value.loadData(class_id)
}
// 图片上传
const handleOpenUpload = () => ImageMainRef.value.openUploadFile()
</script>
<style lang="scss" scoped>
.image-container {
  margin: 15px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  .image-header {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
  }
}
</style>
