<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover">
      <el-form class="search-more" :model="params" ref="searchMoreRef" size="default"
        label-width="68px" v-if="showSearch"
        :label-position="$store.state.isMobile ? 'top' : 'left'">
        <el-row :gutter="20">
          <el-col :md="6" :offset="0">
            <el-form-item label="用户">
              <el-input v-model="params.name" placeholder="输入用户名称" clearable
                @clear="getData"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :offset="0">
            <el-form-item label="公司">
              <el-select v-model="params.export_branch_id" filterable placeholder="选择或搜索公司"
                clearable @clear="getData(1)">
                <el-option :value="item.id" :label="item.name" v-for="item in branch"
                  :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :offset="0">
            <el-form-item label="审核状态">
              <el-select v-model="params.export_status" placeholder="选择审核状态" clearable
                @clear="getData(1)">
                <el-option value="1" label="待审核"></el-option>
                <el-option value="2" label="审核通过"></el-option>
                <el-option value="3" label="审核未通过"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :offset="0">
            <el-form-item label="导出时间">
              <el-date-picker style="width: 45%" v-model="params.create_time"
                value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                range-separator="至" clearable start-placeholder="开始时间" end-placeholder="结束时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="24" :offset="0">
            <el-form-item label="">
              <el-button type="primary" @click="getData(1)">搜索</el-button>
              <el-button @click="resetFrom">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <ListHeader ref="headerRef" action="https://api.xydec.com.cn/order/branch/import"
        :rule="{ export: 64}" @export="exportExcel">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px"
          size="default">
          <el-form-item label="" v-show="!showSearch && !$store.state.isMobile">
            <el-input v-model="params.name" placeholder="输入用户名" clearable @clear="getData(1)">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!showSearch && !$store.state.isMobile" type="primary"
              @click="getData(1)">搜索</el-button>
            <el-button v-permission="66" type="primary" text @click="showSearch = !showSearch">
              {{ showSearch ? '收起' : '展开搜索' }}
              <el-icon>
                <ArrowUp v-if="showSearch" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-form>
      </ListHeader>
      <el-table ref="multipleTableRef" :data="dataList" stripe style="width: 100%"
        tooltip-effect="light" :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }"
        @sort-change="sortChange" @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column type="selection" prop="id" width="55" />
        <el-table-column prop="export_admin_name" label="用户名" show-overflow-tooltip width="150" />
        <el-table-column prop="export_branch_name" show-overflow-tooltip label="公司" width="150" />
        <el-table-column prop="create_time" label="导出时间" width="180" />
        <el-table-column prop="export_total_num" label="导出订单数" width="150" />
        <el-table-column prop="docking_man" show-overflow-tooltip label="公司对接人" width="150" />
        <el-table-column prop="docking_phone" show-overflow-tooltip label="公司对接人电话" width="150" />
        <el-table-column prop="respon_man" show-overflow-tooltip label="公司负责人" width="150" />
        <el-table-column prop="respon_phone" show-overflow-tooltip label="公司负责人电话" width="150" />
        <el-table-column prop="status" width="160" label="审核状态">
          <template #default="scope">
            <el-tag size="small" type="warning" v-if="scope.row.export_status == 1">待审核</el-tag>
            <el-tag size="small" type="success" v-if="scope.row.export_status == 2">审核通过</el-tag>
            <el-tag size="small" type="danger" v-if="scope.row.export_status == 3">审核未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="examine_time" show-overflow-tooltip label="审核时间" width="180" />
        <el-table-column prop="examine_admin_name" show-overflow-tooltip label="审核人" width="150" />
        <el-table-column label="操作" fixed="right" min-width="200">
          <template #default="scope">
            <el-button v-if="params.tab !== 'recyc'" v-permission="83" size="small" type="success"
              @click="handleDetail(scope.row.id)">详情 </el-button>
            <el-button v-permission="63"
              :disabled="scope.row.export_status != 1 && scope.row.export_status != 3" size="small"
              type="primary" @click="handleExamine(scope.row)">
              审核 </el-button>
            <el-button v-permission="67" size="small" type="danger"
              :disabled="!scope.row.export_allow" @click="handleDown(scope.row)"> 下载
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="examine_remark" label="审核意见" width="100" /> -->
      </el-table>
      <el-pagination v-model:current-page="params.page" v-model:page-size="params.pageSize"
        :page-sizes="[10, 15, 50, 100, 200]" :background="true"
        layout="total, sizes, prev, pager, next,slot, jumper" :total="count"
        @current-change="handleCurrentChange" @size-change="handleSizeChange"
        v-show="!$store.state.isMobile" />
      <el-pagination @current-change="handleCurrentChange" :current-page="params.page"
        :page-size="params.pageSize" :background="true" :layout="'total, prev, next'" :total="count"
        class="fenye" v-show="$store.state.isMobile" />
    </el-card>
    <detail ref="detailRef" :detail="details" />
    <el-dialog class="diaolog-form" v-model="showFormDialog" title="导出记录审核"
      :width="$store.state.isMobile? '90%' : 600" :destroy-on-close="true" @closed="dialogClosed"
      :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="140px"
        :label-position="$store.state.isMobile ? 'top' : 'right'">
        <!-- <el-form-item label="用户名" prop="export_admin_id">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.export_admin_id"
            disabled></el-input>
        </el-form-item> -->
        <el-form-item label="审核意见">
          <el-radio-group v-model="form.export_status">
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showFormDialog = false">取消</el-button>
          <el-button style="margin-left:15px;" type="primary" @click="submitExamine"
            :loading="loading">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import exports from '@/api/exports'
import { toast, elLoading, closeElLoading } from '@/utils/utils'
import detail from './compontens/detail.vue'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, dataList, params, getData, handleCurrentChange, handleSizeChange, sortChange, handleDelete, handleSelectionChange, multipleTableRef, handleMultiDelete } = useInitTable({
  api: exports,
  params: {
    page: 1,
    pageSize: 15,
    name: '',
    export_status: '',
    export_branch_id: '',
    create_time: '',
  },
  onGetListSuccess: (res) => {
    dataList.value = res.result.data.map((o) => {
      o.export_allow = false
      if (o.export_num == 0 && o.export_status == 2) o.export_allow = true
      console.log(o.export_allow)

      return o
    })
  },
})

const showSearch = ref(false) // 高级搜索
const searchMoreRef = ref()
const { formDialogRef, formRef, rules, form, handleSubmit } = useInitForm({
  api: exports,
  getData,
  form: {
    export_status: 2,
  },
  rules: {},
  fliterParam(row) {
    if (row.export_status != 1) {
      form.export_status = row.export_status
    }
  },
})

const branch = ref([])

// // select数据,合并远程请求
exports.getSelect().then((res) => {
  if (res.code > 0) {
    branch.value = res.result.branch
  } else {
    toast(res.message || 'Error', 'error')
  }
})

// 表单重置
const resetFrom = () => {
  if (!searchMoreRef.value) return
  // searchMoreRef.value.resetFields()
  params.page = 1
  params.pageSize = 15
  params.name = ''
  params.export_status = ''
  params.export_branch_id = ''
  params.create_time = ''
  getData(1)
}

// 导出
const exportExcel = () => {
  elLoading('数据导出中...')
  exports
    .export(params)
    .then((res) => {
      if (res.code > 0) {
        console.log(res)
        location.href = res.result.url
      } else {
        toast(res.message || 'Error', 'error')
      }
    })
    .finally(() => {
      closeElLoading()
    })
}
// 审核
const export_id = ref(0)
const showFormDialog = ref(false)
const handleExamine = (row) => {
  export_id.value = row.id
  if (row.export_status != 1) form.export_status = row.export_status
  showFormDialog.value = true
}
// 审核提交
const submitExamine = () => {
  exports
    .examine(export_id.value, form)
    .then((res) => {
      if (res.code > 0) {
        toast('数据操作成功')
        showFormDialog.value = false
        getData()
      } else {
        toast(res.message || 'Error', 'error')
      }
    })
    .finally(() => {
      //showFormDialog.value = false
    })
}
const dialogClosed = () => {
  form.export_status = 2
  export_id.value = 0
  showFormDialog.value = false
}
const handleDown = (row) => {
  row.export_allow = false
  //location.href = row.export_url
  // 累积下载次数
  exports.down({ id: row.id }).then((res) => {
    if (res.code > 0) {
      toast('文件下载成功')
      location.href = row.export_url
    } else {
      toast(res.message || 'Error', 'error')
    }
  })
}
const detailRef = ref(null)
const details = ref(null)
// 详情
const handleDetail = (id) => {
  exports
    .read(id)
    .then((res) => {
      if (res.code > 0) {
        //res.result.arrange_time = parseTime(res.result.arrange_time)
        //res.result.order_money = res.result.order_money == 0 ? '' : res.result.order_money
        details.value = res.result
        detailRef.value.openDrawer()
      } else {
        toast(res.message || 'error', 'error')
        return false
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<style lang="scss" scoped>
.search-more {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
