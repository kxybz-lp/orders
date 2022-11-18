<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover">
      <ListHeader :rule="{ create: 35 }" @add="handleAdd" />
      <el-table :data="dataList" stripe style="width: 100%" :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" v-loading="loading">
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="name" label="角色名" width="180"> </el-table-column>
        <el-table-column prop="remark" label="描述" width="180"> </el-table-column>
        <el-table-column label="状态" width="150" v-permission="37">
          <template #default="scope">
            <el-switch
              :modelValue="scope.row.status"
              :disabled="scope.row.id == 1"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleSwitch($event, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button v-permission="38" size="small" type="warning" @click="handleAuths(scope.row)">授权角色 </el-button>
            <el-button v-permission="36" size="small" type="primary" :disabled="scope.row.id == 1" @click="handleEdit(scope.row)">编辑 </el-button>
            <el-button v-permission="39" size="small" type="danger" :disabled="scope.row.id == 1" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="small">
        <el-form-item label="角色名" prop="name">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" minlength="2" maxlength="30" show-word-limit v-model="form.remark" :resize="false"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
    </FormDrawer>
    <!-- 权限配置 -->
    <FormDrawer ref="setAuthsFormDrawerRef" title="授权角色" @submit="handleSetAuthsSubmit">
      <el-tree
        ref="elTreeRef"
        node-key="id"
        :check-strictly="checkStrictly"
        :check-on-click-node="true"
        :default-expanded-keys="defaultExpandedKeys"
        :data="ruleList"
        :props="{ label: 'label', children: 'children' }"
        show-checkbox
        :height="treeHeight"
        @check="handleTreeCheck"
      ></el-tree>
    </FormDrawer>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'
import ListHeader from '@/components/ListHeader.vue'
// import ChooseImage from '@/components/ChooseImage.vue'
import role from '@/api/role'
import menu from '@/api/menu'
import { toast } from '@/utils/utils'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, dataList, getData, handleSwitch, handleDelete } = useInitTable({
  api: role,
  params: {
    page: 1,
    pageSize: 100,
    name: '',
  },
  onGetListSuccess: (res) => {
    count.value = res.result.count
    dataList.value = res.result.data
  },
})
const { drawerTitle, formDrawerRef, formRef, rules, form, handleAdd, handleEdit, handleSubmit, drawerClosed } = useInitForm({
  api: role,
  getData,
  form: {
    name: '',
    remark: '',
    status: 1,
  },
  rules: {
    name: [
      {
        required: true,
        message: '角色名不能为空',
        trigger: 'blur',
      },
    ],
  },
})

const ruleid = ref(35) //新增 权限ID
const ruleList = ref([])
const treeHeight = ref(0)
const roleId = ref(0)
const setAuthsFormDrawerRef = ref(null)
const defaultExpandedKeys = ref([])
const elTreeRef = ref(null)
// 当前角色拥有的权限ID
const ruleIds = ref([])
const checkStrictly = ref(false)

// 授权角色
const handleAuths = (row) => {
  roleId.value = row.id
  treeHeight.value = window.innerHeight - 150
  checkStrictly.value = true //赋值前取消父子强制关联
  menu.getList().then((res) => {
    ruleList.value = res.result.data
    defaultExpandedKeys.value = res.result.data.map((o) => o.id)
    setAuthsFormDrawerRef.value.openDrawer()
    // 当前角色拥有的权限ID
    if (row.auths) ruleIds.value = row.auths.split(',').map((o) => parseInt(o))
    nextTick(() => {
      elTreeRef.value.setCheckedKeys(ruleIds.value)
      checkStrictly.value = false
    })
  })
}

// treeselect勾选监听
const handleTreeCheck = (...e) => {
  // 获取选中与半选中的值
  const { checkedKeys, halfCheckedKeys } = e[1]
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}

// 设置权限
const handleSetAuthsSubmit = () => {
  setAuthsFormDrawerRef.value.showLoading()
  role
    .authorize({ id: roleId.value, auths: ruleIds.value })
    .then((res) => {
      if (res.code > 0) {
        toast('权限设置成功')
        setAuthsFormDrawerRef.value.closeDrawer()
        getData()
      } else {
        toast(res.message, 'error')
      }
    })
    .finally(() => {
      setAuthsFormDrawerRef.value.hideLoading()
    })
}
</script>
<style lang="scss" scoped></style>
