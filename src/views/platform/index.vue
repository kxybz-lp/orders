<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover">
      <ListHeader :rule="{ create: 164, sort: 167 }" @add="handleAdd" @sort="handleSort" />
      <el-table :data="dataList" stripe style="width: 100%" :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" v-loading="loading">
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="name" label="名称" min-width="180"> </el-table-column>
        <el-table-column prop="channel_name" label="包含渠道" min-width="180"> </el-table-column>
        <el-table-column label="排序号" min-width="160">
          <template #default="scope">
            <el-input style="width: 60%" type="number" v-model="scope.row.sort" min="0" />
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="150" v-permission="105">
          <template #default="scope">
            <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0" :loading="scope.row.statusLoading" @change="handleSwitch($event, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button v-permission="165" size="small" type="primary" @click="handleEdit(scope.row)">编辑 </el-button>
            <el-button v-permission="168" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :hide-on-single-page="true"
        :page-size="params.pageSize"
        :background="true"
        :layout="$store.state.isMobile ? 'total,prev, next' : 'total,prev, pager, next'"
        :total="count"
        class="fenye"
      >
      </el-pagination>
    </el-card>
    <FormDialog destroyOnClose :title="dialogTitle" ref="formDialogRef" @dialogClosed="dialogClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="140px" :label-position="$store.state.isMobile ? 'top' : 'right'">
        <el-form-item label="名称" prop="name">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="包含渠道" prop="channel_ids">
          <el-select clearable multiple filterable v-model="form.channel_ids" placeholder="选择渠道">
            <el-option :value="item.id.toString()" :label="item.name" :disabled="item.status == 2" v-for="item in channelList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input v-model="form.sort" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
    </FormDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormDialog from '@/components/FormDialog.vue'
import ListHeader from '@/components/ListHeader.vue'
import platform from '@/api/platform'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, params, dataList, handleCurrentChange, getData, handleSwitch, handleSort, handleDelete } = useInitTable({
  api: platform,
  params: {
    page: 1,
    pageSize: 15,
    name: '',
  },
})
const { dialogTitle, formDialogRef, formRef, rules, form, handleAdd, handleEdit, handleSubmit, dialogClosed } = useInitForm({
  api: platform,
  getData,
  form: {
    pid: 0,
    name: '',
    channel_ids: [],
    sort: 100,
    status: 1,
  },
  rules: {
    name: [
      {
        required: true,
        message: '名称不能为空',
        trigger: 'blur',
      },
    ],
  },
})

const channelList = ref([])
// select数据,合并远程请求
platform.getSelect().then((res) => {
  if (res.code > 0) {
    channelList.value = res.result.channel
  } else {
    toast(res.message || 'Error', 'error')
  }
})
</script>
<style lang="scss" scoped></style>
