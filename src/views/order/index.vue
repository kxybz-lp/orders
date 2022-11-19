<template>
  <div class="app-container">
    <el-card class="menu-card" shadow="hover">
      <ListHeader @add="handleAdd" :rule="{ create: 79 }">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="small">
          <el-form-item label="">
            <el-input v-model="params.mobile" placeholder="输入手机号" clearable @clear="getData"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">搜索</el-button>
          </el-form-item>
        </el-form>
      </ListHeader>
      <el-table
        ref="multipleTableRef"
        :data="dataList"
        stripe
        style="width: 100%"
        :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="name" label="客户名称" width="140"> </el-table-column>
        <el-table-column prop="branch_id" label="所属公司" width="160"> </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template #default="scope">
            <el-button v-permission="80" size="small" type="primary" :disabled="scope.row.id == 777" @click="handleEdit(scope.row)">编辑 </el-button>
            <el-button v-permission="87" size="small" type="danger" :disabled="scope.row.id == 777" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="params.page" :page-size="params.pageSize" :background="true" layout="prev, pager, next" :total="count" class="fenye">
      </el-pagination>
      <!-- <el-row :gutter="2" v-for="(item, index) in form.meta" :key="item.key">
        <el-col :span="11" :offset="0">
          <el-input v-model="item.key" />
        </el-col>
        <el-col :span="11" :offset="0">
          <el-input v-model="item.value" />
        </el-col>
        <el-col :span="2" :offset="0">
          <el-icon v-if="index == 0" @click="addMeta" size="24"><Plus /></el-icon>
          <el-icon v-else @click="minusMeta(index)" size="24"><Minus /></el-icon>
        </el-col>
      </el-row> -->
    </el-card>
    <FormDrawer :title="'订单' + drawerTitle" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="small">
        <el-form-item label="客户名称" prop="name">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.name" :disabled="editId != 0"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属公司" prop="branch_id">
          <el-select clearable multiple filterable v-model="form.branch_id" placeholder="选择公司">
            <el-option :value="item.id.toString()" :label="item.name" :disabled="item.status == 2" v-for="item in branchList" :key="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>
<script setup>
import ListHeader from '@/components/ListHeader.vue'
import { reactive, ref } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'
// import ChooseImage from '@/components/ChooseImage.vue'
// import TagInput from '@/components/TagInput.vue'
import order from '@/api/order'
import { toast } from '@/utils/utils'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, dataList, params, getData, handleCurrentChange, handleSwitch, sortChange, handleDelete, handleSelectionChange, multipleTableRef } = useInitTable({
  api: order,
  params: {
    page: 1,
    pageSize: 10,
    name: '',
    mobile: '',
  },
  onGetListSuccess: (res) => {
    count.value = res.result.count
    dataList.value = res.result.data
  },
})
const { drawerTitle, formDrawerRef, formRef, rules, form, editId, handleAdd, handleEdit, handleSubmit, drawerClosed } = useInitForm({
  api: order,
  getData,
  form: {
    name: '',
    mobile: '',
    status: 1,
  },
  rules: {
    name: [
      {
        required: true,
        message: '客户名称不能为空',
        trigger: 'blur',
      },
    ],
  },
})

// const form = reactive({
//   meta: [{ key: '', value: '' }],
// })
// const addMeta = () => {
//   form.meta.push({ key: '', value: '' })
// }
// const minusMeta = (index) => {
//   form.meta.splice(index, 1)
// }
const ruleid = ref(8) //新增 权限ID
</script>
<style lang="scss" scoped></style>
