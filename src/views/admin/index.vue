<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover">
      <ListHeader :ruleid="ruleid" @add="handleAdd">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="small">
          <el-form-item label="">
            <el-select v-model="params.role_id" placeholder="选择角色" clearable @clear="getData">
              <el-option :value="item.id" :label="item.name" v-for="item in roleList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="params.name" placeholder="输入用户名" clearable @clear="getData"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">搜索</el-button>
          </el-form-item>
        </el-form>
      </ListHeader>
      <el-table :data="dataList" stripe style="width: 100%" :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" @sort-change="sortChange" v-loading="loading">
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="name" label="登录名" width="140"> </el-table-column>
        <el-table-column prop="role_name" label="角色" width="140"> </el-table-column>
        <el-table-column prop="branch_name" label="所属公司" width="160"> </el-table-column>
        <el-table-column prop="ip" label="最后登录IP" width="140"> </el-table-column>
        <el-table-column prop="last_login_time" sortable label="最后登录时间" width="140">
          <template #default="scope">
            {{ $filters.dateFormart(scope.row.last_login_time, 'hour') }}
          </template>
        </el-table-column>
        <el-table-column label="状态" v-permission="32">
          <template #default="scope">
            <el-switch
              :modelValue="scope.row.status"
              :disabled="scope.row.id == 777"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleSwitch($event, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template #default="scope">
            <el-button v-permission="31" size="small" type="primary" :disabled="scope.row.id == 777" @click="handleEdit(scope.row)">编辑 </el-button>
            <el-button v-permission="33" size="small" type="danger" :disabled="scope.row.id == 777" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="params.page" :page-size="params.pageSize" :background="true" layout="prev, pager, next" :total="count" class="fenye">
      </el-pagination>
    </el-card>
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="small">
        <el-form-item label="登录名" prop="name">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.name" :disabled="editId != 0"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password v-model="form.password" :placeholder="editId == 0 ? '' : '留空则不修改密码'"></el-input>
        </el-form-item>
        <el-form-item v-if="editId == 0" label="确认密码" prop="password_confirm">
          <el-input type="password" show-password v-model="form.password_confirm"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="选择角色">
            <el-option :value="item.id" :label="item.name" :disabled="item.status == 0" v-for="item in roleList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司" prop="branch_id">
          <el-select clearable multiple filterable v-model="form.branch_id" placeholder="选择公司">
            <el-option :value="item.id.toString()" :label="item.name" :disabled="item.status == 2" v-for="item in branchList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar" />
        </el-form-item> -->
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'
import ListHeader from '@/components/ListHeader.vue'
// import ChooseImage from '@/components/ChooseImage.vue'
import admin from '@/api/admin'
import { toast } from '@/utils/utils'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, dataList, params, getData, handleCurrentChange, handleSwitch, sortChange, handleDelete } = useInitTable({
  api: admin,
  params: {
    page: 1,
    pageSize: 10,
    name: '',
    role_id: '',
    sort: '',
  },
  onGetListSuccess: (res) => {
    count.value = res.result.count
    dataList.value = res.result.data.map((o) => {
      o.statusLoading = false
      return o
    })
  },
})

const ruleid = ref(8) //新增 权限ID
// 密码验证
const validatePass = (rule, value, callback) => {
  if (value === '' && editId.value == 0) {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
// 确认密码验证
const validateCheckPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  } else {
    if (value != form.password) {
      callback(new Error('确认密码与密码不一致'))
    }
    callback()
  }
}
const { drawerTitle, formDrawerRef, formRef, rules, form, editId, handleAdd, handleEdit, handleSubmit, drawerClosed } = useInitForm({
  api: admin,
  getData,
  form: {
    name: '',
    password: '',
    password_confirm: '',
    role_id: '',
    branch_id: [],
    // avatar: '',
    status: 1,
  },
  rules: {
    name: [
      {
        required: true,
        message: '登录名不能为空',
        trigger: 'blur',
      },
    ],
    password: [
      {
        validator: validatePass,
        trigger: 'blur',
      },
      { min: 6, max: 20, message: '密码长度6至20位之间', trigger: 'blur' },
    ],
    password_confirm: [
      {
        validator: validateCheckPass,
        trigger: 'blur',
      },
    ],
    role_id: [
      {
        required: true,
        message: '请选择角色',
        trigger: 'blur',
      },
    ],
    branch_id: [
      {
        type: 'array',
        required: true,
        message: '请选择所属公司',
        trigger: 'blur',
      },
    ],
  },
  fliterParam: (row) => {
    console.log(row['branch_id'])
    row['password'] = ''
    // row['branch_id'] = row['branch_id'].split(',').map((o) => parseInt(o))
    for (const key in form) {
      form[key] = row[key]
    }
  },
})

// const params_branch = reactive({
//   page: 1,
//   pageSize: 10,
// })

const roleList = ref([])
const branchList = ref([])

// select数据,合并远程请求
admin.getSelect().then((res) => {
  if (res.code > 0) {
    roleList.value = res.result.role
    branchList.value = res.result.branch
  } else {
    toast(res.message || 'Error', 'error')
  }
})

// const instance = getCurrentInstance()
// const $api = instance.proxy.$api
</script>
<style lang="scss" scoped></style>
