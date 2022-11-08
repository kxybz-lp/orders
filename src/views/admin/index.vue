<template>
  <div class="app-container">
    <el-card class="admin-card">
      <div class="app-header">
        <div class="app-header-l">
          <el-button color="var(--color)" size="small" @click="handleAdd">新增</el-button>
        </div>
        <div class="app-header-r">
          <el-form>
            <el-row>
              <el-col>
                <!-- <el-form-item>
                  <el-select placeholder="所属角色">
                    <el-option> </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select placeholder="是否绑定微信">
                    <el-option value="1" label="已绑定"></el-option>
                    <el-option value="0" label="未绑定"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="state.params.name" placeholder="输入用户名查找"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button color="var(--color)" size="small" @click="handleSearch">搜索 </el-button>
                </el-form-item> -->
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="app-body">
        <el-table :data="state.dataList" stripe style="width: 100%" :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }">
          <el-table-column type="selection" prop="id" width="55"> </el-table-column>
          <el-table-column prop="name" label="登录名"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="branch_name" label="所属公司"> </el-table-column>
          <el-table-column prop="ip" label="最后登录IP"> </el-table-column>
          <el-table-column sortable label="最后登录时间">
            <template #default="scope">
              {{ $filters.dateFormart(scope.row.last_login_time, 'hour') }}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="var(--color)" inactive-color="#B9B9B9" @change="changeSwitch(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="scope">
              <el-button size="small" class="el-button--theme" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="state.params.page"
          :page-size="state.params.pageSize"
          :background="true"
          layout="prev, pager, next"
          :total="state.count"
          class="fenye"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import admin from '@/api/admin'
import { toast } from '@/utils/utils'
const state = reactive({
  dataList: [],
  count: 0,
  params: {
    page: 1,
    pageSize: 10,
    name: '',
    role_id: '',
  },
  formOptions: [
    {
      label: '',
      prop: 'role_id',
      placeholder: '选择所属角色',
      element: 'el-select',
      options: [
        { label: '超级管理员', value: 1 },
        { label: '分公司管理员', value: 2 },
      ],
    },
    {
      label: '',
      prop: 'openid',
      placeholder: '是否绑定微信',
      element: 'el-select',
      options: [
        { label: '未绑定', value: 0 },
        { label: '已绑定', value: 1 },
      ],
    },
    {
      label: '用户名',
      prop: 'name',
      placeholder: '输入用户名查找',
      element: 'el-input',
    },
  ],
})

// const instance = getCurrentInstance()
// const $api = instance.proxy.$api
const getList = () => {
  admin.getList(state.params).then((res) => {
    if (res.code > 0) {
      state.count = res.result.count
      state.dataList = res.result.data
    } else {
      toast(res.message || 'Error', 'error')
    }
  })
}
//获取数据
getList()
// 搜索
const handleSearch = () => {}
// 新增
const handleAdd = () => {}
//编辑
//设置状态
const changeSwitch = () => {}
//切换分页数
const handleSizeChange = () => {}
//切换分页码
const handleCurrentChange = (page) => {
  state.params.page = page
  getList()
}
</script>
<style lang="scss" scoped></style>
