<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover">
      <ListHeader :rule="{ create: 8 }" @add="handleAdd">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="default">
          <el-form-item label="" v-show="!$store.state.isMobile">
            <el-select v-model="params.channel" placeholder="选择渠道" clearable @clear="getData(1)">
              <el-option :value="item.tag" :label="item.name" v-for="item in channelList" :key="item.tag"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" v-show="!$store.state.isMobile">
            <el-select v-model="params.source" placeholder="选择来源" filterable clearable @clear="getData(1)">
              <el-option :value="item" :label="item" v-for="item in sourceList" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="params.mobile" placeholder="输入客户手机号" clearable @clear="getData(1)"> </el-input>
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
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" prop="id" width="55"> </el-table-column>
        <el-table-column prop="type" label="订单类型" min-width="90" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="channel" label="渠道" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="create_time" label="下单时间" min-width="170"> </el-table-column>
        <el-table-column prop="source" label="来源" min-width="140" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="name" label="客户名称" min-width="80" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="mobile" label="客户电话" min-width="110"> </el-table-column>
        <el-table-column prop="address" label="客户地址" min-width="120" show-overflow-tooltip>
          <template #default="scope"> {{ scope.row.province_name }}{{ scope.row.city_name }}{{ scope.row.building }} </template>
        </el-table-column>
        <el-table-column prop="size" label="面积" min-width="80" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="110" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="url" label="下单页" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="ip" label="客户IP" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="other" label="其他需求" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column label="处理状态" v-permission="172">
          <template #default="scope">
            <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0" :loading="scope.row.statusLoading" @change="handleSwitch($event, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="scope">
            <el-button v-permission="172" size="small" type="primary" @click="handleEdit(scope.row)">详情 </el-button>
            <el-button v-permission="174" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import brand_order from '@/api/brand_order'
import { toast } from '@/utils/utils'
import { useInitTable } from '@/hooks/useCommon'
const { loading, count, dataList, params, getData, handleCurrentChange, handleSwitch, sortChange, handleDelete, handleSelectionChange } = useInitTable({
  api: brand_order,
  params: {
    page: 1,
    pageSize: 15,
    name: '',
    mobile: '',
    channel: '',
    source: '',
  },
  onGetListSuccess: (res) => {
    count.value = res.result.total
    dataList.value = res.result.data.map((o) => {
      // o.last_login_time = dateFormart(o.last_login_time, 'hour')
      o.statusLoading = false
      return o
    })
  },
})

const channelList = ref([])
const sourceList = ref([])

// select数据,合并远程请求
brand_order.getSelect().then((res) => {
  if (res.code > 0) {
    channelList.value = res.result.channel
    sourceList.value = res.result.source
  } else {
    toast(res.message || 'Error', 'error')
  }
})

// const instance = getCurrentInstance()
// const $api = instance.proxy.$api
</script>
<style lang="scss" scoped></style>
