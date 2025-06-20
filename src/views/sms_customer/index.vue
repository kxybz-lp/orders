<template>
  <div class="app-container">
    <el-card class="sms-card" shadow="hover">
      <ListHeader :rule="{ create: 161, delete: 160 }" @delete="handleMultiDelete" @add="handleAdd">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="default" v-if="!$store.state.isMobile">
          <el-form-item label="">
            <el-select v-model="params.status" placeholder="发送状态" clearable @clear="getData(1)">
              <el-option :value="item.id" :label="item.name" v-for="item in status" :key="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="params.mobile" placeholder="客户电话" clearable @clear="getData(1)"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              style="width: 45%"
              v-model="params.create_time"
              value-format="YYYY-MM-DD HH:mm:ss"
              :editable="false"
              type="datetimerange"
              range-separator="至"
              clearable
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </ListHeader>
      <el-table
        ref="multipleTableRef"
        :data="dataList"
        stripe
        style="width: 100%"
        :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="mobile" label="客户电话" min-width="150"> </el-table-column>
        <el-table-column prop="status" label="状态" min-width="120">
          <template #default="scope">
            <el-tag size="small" :type="scope.row.status == 1 ? 'success' : 'danger'"> {{ scope.row.status == 1 ? '成功' : '失败' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fail_reason" show-overflow-tooltip min-width="150" label="失败原因"> </el-table-column>
        <el-table-column prop="create_time" label="操作时间" min-width="180"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button v-permission="75" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.pageSize"
        :background="true"
        :layout="$store.state.isMobile ? 'total,prev, next' : 'total,prev, pager, next'"
        :total="count"
        class="fenye"
      >
      </el-pagination>
    </el-card>
    <FormDialog destroyOnClose :title="'客户短信通知' + dialogTitle" ref="formDialogRef" @dialogClosed="dialogClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="140px" :label-position="$store.state.isMobile ? 'top' : 'right'">
        <el-form-item label="客户手机号" prop="content">
          <el-input type="textarea" :rows="10" resize="none" placeholder="一行一个手机号码，多个号码请使用回车键" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
    </FormDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import sms_customer from '@/api/sms_customer'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, dataList, params, getData, handleCurrentChange, handleDelete, handleSelectionChange, multipleTableRef, handleMultiDelete } = useInitTable({
  api: sms_customer,
  params: {
    page: 1,
    pageSize: 15,
    status: '',
    mobile: '',
    create_time: '',
  },
})
const { dialogTitle, formDialogRef, formRef, rules, form, handleAdd, handleSubmit, dialogClosed } = useInitForm({
  api: sms_customer,
  getData,
  form: {
    sort: 100,
    status: 1,
    mobile: '',
  },
  rules: {
    mobile: [
      {
        required: true,
        message: '客户手机号不能为空',
        trigger: 'blur',
      },
    ],
  },
})

const status = [
  {
    id: 1,
    name: '成功',
  },
  {
    id: 2,
    name: '失败',
  },
]
</script>
<style lang="scss" scoped></style>
