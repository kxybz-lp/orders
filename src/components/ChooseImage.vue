<template>
  <div v-if="modelValue && preview">
    <el-image class="privew-image" v-if="typeof modelValue == 'string'" :src="modelValue" fit="cover"></el-image>
    <div v-else class="flex flex-wrap">
      <div class="image-list" v-for="(url, index) in modelValue" :key="index">
        <el-icon style="z-index: 10" @click="removeImage(url)"><CircleClose /></el-icon>
        <el-image :src="url" fit="cover"></el-image>
      </div>
    </div>
  </div>

  <div v-if="preview" class="choose-image-btn" @click="open">
    <el-icon :size="25"><Plus /></el-icon>
  </div>
  <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class="image-container" style="height: 70vh">
      <el-header class="image-header">
        <el-button color="var(--color)" size="small" @click="handleOpenCreate">新增分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">图片上传</el-button>
      </el-header>
      <el-container style="height: calc(70vh-60px)">
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange"></ImageAside>
        <ImageMain :limit="limit" openChoose ref="ImageMainRef" @choose="handleChoose"></ImageMain>
      </el-container>
    </el-container>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import ImageAside from '@/components/image/ImageAside.vue'
import ImageMain from '@/components/image/ImageMain.vue'
import { toast } from '@/utils/utils'

const ImageAsideRef = ref(null)
const ImageMainRef = ref(null)
// 新增图片分类,调用子类暴露的方法
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
const handleAsideChange = (class_id) => {
  ImageMainRef.value.loadData(class_id)
}
// 图片上传
const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

const dialogVisible = ref(false)

const callbackFunction = ref(null)
const open = (callback = null) => {
  callbackFunction.value = callback
  dialogVisible.value = true
}
const close = () => (dialogVisible.value = false)

const props = defineProps({
  modelValue: [String, Array],
  limit: {
    type: Number,
    default: 1,
  },
  preview: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:modelValue'])

let urls = []
const handleChoose = (e) => {
  urls = e.map((o) => o.url)
}

const submit = () => {
  let value = []
  if (props.limit == 1) {
    value = urls[0]
  } else {
    value = props.preview ? [...props.modelValue, ...urls] : [...urls]
    if (value.length > props.limit) {
      let limit = props.preview ? props.limit - props.modelValue.length : props.limit
      return toast('最多还能选择' + limit + '张')
    }
  }
  if (value && props.preview) {
    emit('update:modelValue', value)
  }
  if (!props.preview && typeof callbackFunction.value === 'function') {
    callbackFunction.value(value)
  }
  close()
}

const removeImage = (url) =>
  emit(
    'update:modelValue',
    props.modelValue.filter((u) => u != url)
  )

defineExpose({
  open,
})
</script>
<style lang="scss" scoped>
.privew-image {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #eee;
  margin-right: 10px;
}
.choose-image-btn {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon {
    color: #eee;
  }
}
.image-list {
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
  .el-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background-color: #fff;
  }
}
.image-container {
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
