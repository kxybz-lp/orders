<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover">
      <ListHeader :rule="{ create: 122, sort: 125 }" @add="handleAdd" @sort="handleSort" />
      <el-table :data="dataList" stripe style="width: 100%" :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" v-loading="loading">
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip width="250"> </el-table-column>
        <el-table-column label="排序号">
          <template #default="scope">
            <el-input style="width: 60%" type="number" v-model="scope.row.list_order" min="0" />
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120" v-permission="124">
          <template #default="scope">
            <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0" :loading="scope.row.statusLoading" @change="handleSwitch($event, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip width="150"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button v-permission="123" size="small" type="primary" @click="handleEdit(scope.row)">编辑 </el-button>
            <el-button v-permission="126" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <FormDrawer :title="'公告' + drawerTitle" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="small">
        <el-form-item label="标题" prop="title">
          <el-input minlength="2" maxlength="50" show-word-limit v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="排序号">
          <el-input v-model="form.list_order" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :rows="10" resize="none" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import ListHeader from '@/components/ListHeader.vue'
import notice from '@/api/notice'
import { useInitTable, useInitForm } from '@/hooks/useCommon'

const { loading, dataList, getData, handleSwitch, handleSort, handleDelete } = useInitTable({
  api: notice,
  params: {
    page: 1,
    pageSize: 10,
    title: '',
  },
})

const { drawerTitle, formDrawerRef, formRef, rules, form, handleAdd, handleEdit, handleSubmit, drawerClosed } = useInitForm({
  api: notice,
  getData,
  form: {
    title: '',
    list_order: 100,
    status: 1,
    content: '',
  },
  rules: {
    title: [
      {
        required: true,
        message: '公告标题不能为空',
        trigger: 'blur',
      },
    ],
    content: [
      {
        required: true,
        message: '公告内容不能为空',
        trigger: 'blur',
      },
    ],
  },
})
</script>
<style lang="scss" scoped></style>
