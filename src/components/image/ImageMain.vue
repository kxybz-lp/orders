<template>
  <el-main class="image-main" v-loading="loading">
    <div class="image-lists">
      <el-scrollbar>
        <el-empty description="暂无图片" v-if="!imageList.length" />
        <el-row :gutter="10">
          <el-col :sm="12" :md="6" :offset="0" v-for="item in imageList" :key="item.id" style="margin-bottom: 15px">
            <el-card shadow="hover" :body-style="{ padding: 0 }" :class="item.checked ? 'checked' : ''">
              <div class="img-tit">
                <el-image :src="item.url" fit="cover" style="width: 100%; height: 150px" :preview-src-list="[item.url]" :initial-index="0"></el-image>
                <div class="title">{{ item.name }}</div>
              </div>
              <div class="buttons">
                <el-checkbox v-if="openChoose" v-model="item.checked" @change="handleChooseChange(item)" />
                <el-button class="buttons-edit" text type="primary" size="small" @click.stop="handleEdit(item)"> 编辑 </el-button>
                <el-button class="buttons-delete" text type="primary" size="small" @click.stop="handleDelete(item.id)"> 删除 </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
    <div class="image-page">
      <el-pagination background layout="prev, pager, next" :total="count" :current-page="params.page" :page-size="params.pageSize" @current-change="getData" />
    </div>
    <el-drawer v-model="drawer" title="上传图片" :destroy-on-close="true">
      <UploadFile :data="{ class_id: params.class_id }" @success="handleUploadSuccess" />
    </el-drawer>
    <FormDrawer title="修改" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="所属分类" prop="form.class_id">
          <el-select style="width: 100%" v-model="form.class_id" placeholder="请选择">
            <el-option :value="item.id" :label="item.name" v-for="item in classList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-main>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import { toast, showModal } from '@/utils/utils'
import FormDrawer from '../FormDrawer.vue'
import image from '@/api/image'
const loading = ref(false)
const imageList = ref([])
const formDrawerRef = ref([])
const formRef = ref([])
const classList = ref([])
const image_id = ref(0)
const drawer = ref(false)
const openUploadFile = () => (drawer.value = true)
const count = ref(0)
const params = reactive({
  page: 1,
  pageSize: 12,
  class_id: 1,
})
const form = reactive({
  name: '',
  class_id: 1,
  url: '',
})
getData()
// 获取数据
function getData(p = null) {
  if (typeof p == 'number') {
    params.page = p
  }

  loading.value = true
  image
    .getList(params)
    .then((res) => {
      if (res.code > 0) {
        count.value = res.result.count
        imageList.value = res.result.data.map((o) => {
          o.checked = false
          return o
        })
      } else {
        toast(res.message || 'Error', 'error')
      }
    })
    .finally(() => {
      loading.value = false
    })
}
// 根据分类ID重新加载图片列表
const loadData = (id) => {
  params.page = 1
  params.class_id = id
  getData()
}
const rules = {
  class_id: [
    {
      required: true,
      message: '图库分类不能为空',
      trigger: 'blur',
    },
  ],
}

getData()
// 设置分类
const handleEdit = (item) => {
  image_id.value = item.id
  form.class_id = item.class_id
  form.name = item.name
  form.url = item.url
  image.getClassList().then((res) => {
    classList.value = res.result
    formDrawerRef.value.openDrawer()
  })
}
// 删除
const handleDelete = (id) => {
  showModal('确认要删除该分类吗？')
    .then((res) => {
      loading.value = true
      image
        .remove(id)
        .then((res) => {
          if (res.code > 0) {
            toast('数据删除成功')
            getData()
          } else {
            toast(res.message, 'error')
          }
        })
        .finally(() => {
          loading.value = true
        })
    })
    .catch((err) => console.log(err))
}
// 图片上传成功回调\
const handleUploadSuccess = () => {
  drawer.value = false
  getData(1)
}
// 提交
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    if (image_id.value) {
      image
        .update(image_id.value, form)
        .then((res) => {
          if (res.code > 0) {
            toast('数据更新成功')
            formDrawerRef.value.closeDrawer()
            getData()
          } else {
            toast(res.message, 'error')
          }
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    }
  })
}
// 弹窗关闭重置表单
const drawerClosed = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

const props = defineProps({
  openChoose: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 1,
  },
})

// 选中的图片
const emit = defineEmits(['choose'])
const checkedImage = computed(() => imageList.value.filter((o) => o.checked))
const handleChooseChange = (item) => {
  if (item.checked && checkedImage.value.length > props.limit) {
    item.checked = false
    return toast(`最多只能选中${props.limit}张`, 'error')
  }
  emit('choose', checkedImage.value)
}
defineExpose({
  loadData,
  openUploadFile,
})
</script>
<style lang="scss" scoped>
.image-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .image-lists {
    flex: 1;
    overflow: hidden;
    .checked {
      border: 1px solid var(--color);
    }
    .img-tit {
      height: 150px;
      position: relative;
      .title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        color: #fff;
        font-size: 12px;
        text-align: center;
        padding: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
      .el-button {
        margin-left: 0 !important;
      }
    }
  }
  .image-page {
    height: 50px;
  }
}
</style>
