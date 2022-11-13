<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <el-scrollbar>
      <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index" @edit="handleEdit(item)" @delete="handleDelete(item.id)" @click="handleChangeActiveId(item.id)">
        {{ item.name }}
      </AsideList>
    </el-scrollbar>
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sort_no">
          <el-input-number v-model="form.sort_no" :min="1" :max="1000" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-aside>
</template>
<script setup>
import { ref, computed, reactive } from 'vue'
import image from '@/api/image'
import AsideList from './AsideList.vue'
import FormDrawer from '../FormDrawer.vue'
import { showModal, toast } from '@/utils/utils'
// 加载动画
const loading = ref(false)
const list = ref([])
const editId = ref(0)
const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  name: '',
  sort_no: 100,
})
const rules = {
  name: [
    {
      required: true,
      message: '图库分类名称不能为空',
      trigger: 'blur',
    },
  ],
}
// 图库分类数据
const getData = () => {
  loading.value = true
  image
    .getClassList()
    .then((res) => {
      list.value = res.result
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

// 默认选中图库分类ID
const activeId = ref(1)
const emit = defineEmits(['change'])
// 切换分类
function handleChangeActiveId(id) {
  activeId.value = id
  emit('change', id)
}
// 新增
const handleCreate = () => {
  editId.value = 0
  formDrawerRef.value.openDrawer()
}
// 编辑分类，重要内容请求服务器获取item
const handleEdit = (item) => {
  editId.value = item.id
  form.name = item.name
  form.order = item.order
  formDrawerRef.value.openDrawer()
}
// 删除分类
const handleDelete = (id) => {
  showModal('确认要删除该分类吗？')
    .then((res) => {
      loading.value = true
      image
        .deleteClass(id)
        .then((res) => {
          if (res.code > 0) {
            toast('数据删除成功')
          } else {
            toast(res.message, 'error')
          }
          getData()
        })
        .finally(() => {
          loading.value = false
        })
    })
    .catch((err) => console.log(err))
  return
}

// 提交
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    if (editId.value) {
      image
        .updateClass(editId.value, form)
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
    } else {
      image
        .createClass(form)
        .then((res) => {
          if (res.code > 0) {
            toast('数据新增成功')
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
    // const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)

    // fun
    //   .then((res) => {
    //     toast(drawerTitle.value + '成功')
    //     getData(editId.value ? currentPage.value : 1)
    //     formDrawerRef.value.close()
    //   })
    //   .finally(() => {
    //     formDrawerRef.value.hideLoading()
    //   })
  })
}
// 弹窗关闭重置表单
const drawerClosed = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
defineExpose({
  handleCreate,
  formRef,
})
</script>
<style lang="scss" scoped>
.image-aside {
  height: 100%;
  border-right: 1px solid #eee;
  overflow-y: hidden;
}
</style>
