<template>
  <div class="app-container">
    <el-card class="menu-card" shadow="hover">
      <el-tabs v-model="params.tab" @tab-change="getData(1)">
        <el-tab-pane :label="item.name" :name="item.key" v-for="item in tabbars" :key="item.key" />
      </el-tabs>
      <transition v-bind="listeners">
        <el-form class="search-more" :model="params" ref="searchMoreRef" label-width="80px" size="small" v-show="showSearch">
          <el-row :gutter="0">
            <el-col :md="6" :offset="0">
              <el-form-item label="下单时间">
                <el-date-picker
                  style="width: 45%"
                  v-model="params.order_time"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :editable="false"
                  type="datetimerange"
                  range-separator="至"
                  clearable
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="推广渠道">
                <el-select v-model="params.channel_id" placeholder="选择或搜索渠道" filterable clearable multiple @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in channel" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="客户来源">
                <el-select v-model="params.source_id" placeholder="选择或搜索来源" filterable clearable multiple @clear="getData(1)">
                  <el-option-group v-for="group in source" :key="group.label" :label="group.label">
                    <el-option :value="item.id" :label="item.name" v-for="item in group.options" :key="item.id"></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="手机号">
                <el-input v-model="params.mobile" placeholder="输入客户电话" clearable @clear="getData(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :md="6" :offset="0">
              <el-form-item label="所在省">
                <el-select v-model="params.province_id" filterable placeholder="选择或搜索省" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.areaname" v-for="item in province" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="所在市">
                <el-select v-model="params.city_id" placeholder="选择或搜索城市" filterable clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.areaname" v-for="item in city" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="接单公司">
                <el-select v-model="params.receive_company" placeholder="选择或搜索公司" clearable multiple filterable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in branch" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="订单状态">
                <el-select v-model="params.status_id" multiple placeholder="选择状态" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in status" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :md="6" :offset="0">
              <el-form-item label="派单时间">
                <el-date-picker
                  style="width: 45%"
                  v-model="params.arrange_time"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :editable="false"
                  type="datetimerange"
                  range-separator="至"
                  clearable
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="交定时间">
                <el-date-picker
                  style="width: 45%"
                  v-model="params.deal_time"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :editable="false"
                  type="datetimerange"
                  range-separator="至"
                  clearable
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="无效标签">
                <el-select v-model="params.invalid_tag" placeholder="选择标签" clearable multiple @clear="getData(1)">
                  <el-option :value="item.name" :label="item.name" v-for="item in tag" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="审核状态">
                <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :md="6" :offset="0">
              <el-form-item label="客户回访">
                <el-select v-model="params.is_visit" placeholder="请选择" clearable multiple @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in visit" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="客户名称">
                <el-input v-model="params.name" placeholder="输入客户名称" clearable @clear="getData(1)"></el-input>
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
      </transition>
      <ListHeader
        :rule="{ create: 79, move: 84, export: 81, import: 82, download: 82 }"
        action="/api/order/order/import"
        @add="handleAdd"
        @move="handMove"
        @export="exportExcel"
        @import="importExcel"
        @download="download"
      >
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="small">
          <el-form-item v-show="!showSearch" label="">
            <el-input v-model="params.mobile" placeholder="输入手机号" clearable @clear="getData"></el-input>
          </el-form-item>
          <el-form-item v-show="!showSearch" label="">
            <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable @clear="getData(1)">
              <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData(1)">搜索</el-button>
            <el-button v-permission="86" type="primary" text @click="showSearch = !showSearch">
              {{ showSearch ? '收起' : '展开' }}
              <el-icon>
                <ArrowUp v-if="showSearch" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
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
        tooltip-effect="light"
      >
        <el-table-column type="selection" prop="id" width="55" />
        <el-table-column v-if="$store.state.adminInfo.branch_id === '1'" prop="channel_name" label="渠道" width="100" />
        <el-table-column prop="order_time" :formatter="dateFormatter" sortable label="下单日期" width="120" />
        <el-table-column prop="order_time" :formatter="timeFormatter" label="下单时间" width="100" />
        <el-table-column v-if="$store.state.adminInfo.branch_id === '1'" prop="source_name" label="来源" width="130" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="电话" width="140">
          <template #default="scope">
            <span @click="searchMobile(scope.row.mobile)" :class="scope.row.mobile_repeats > 1 ? 'red' : ''">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="120">
          <template #default="scope">
            <el-tag type="danger" style="color: #fb6a3a" v-if="scope.row.is_audit === 1">待跟进</el-tag>
            <el-tag type="warning" v-else-if="scope.row.is_audit === 2">待审核</el-tag>
            <el-tag @click="failReason(scope.row.fail_reason)" style="cursor: pointer" type="danger" v-else-if="scope.row.is_audit === 3">审核未通过</el-tag>
            <el-tag type="success" v-else-if="scope.row.is_audit === 4">审核通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="area" :formatter="areaFormatter" show-overflow-tooltip label="区域" width="140" />
        <el-table-column prop="address" show-overflow-tooltip label="详细地址" width="140" />
        <el-table-column prop="size" label="面积" width="120" />
        <el-table-column prop="arrange_time" sortable label="派单时间" width="150" />
        <el-table-column prop="branch_name" show-overflow-tooltip label="接单公司" width="140" />
        <el-table-column prop="status_name" label="订单状态" width="140" />
        <el-table-column prop="deal_time" sortable label="反馈交定时间" width="150" />
        <el-table-column prop="follow_time" sortable label="最新跟进时间" width="160" />
        <el-table-column show-overflow-tooltip label="最新跟进进展" width="180">
          <template #default="scope">
            {{ scope.row.follows.length > 0 ? scope.row.follows[0]['follow_note'] : '' }}
          </template>
        </el-table-column>
        <el-table-column v-if="$store.state.adminInfo.branch_id === '1'" label="无效标签" width="160">
          <template #default="scope">
            <span style="color: #ff5722">{{ scope.row.invalid_tag }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="$store.state.adminInfo.branch_id === '1'" prop="is_visit" label="客户回访" width="160">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.is_visit === 1">待回访</el-tag>
            <el-tag v-else-if="scope.row.is_visit === 2">无需回访</el-tag>
            <el-tag type="success" v-else-if="scope.row.is_visit === 3">已回访</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="$store.state.adminInfo.branch_id === '1'" prop="visit_time" sortable label="最近回访时间" width="150" />
        <el-table-column v-if="$store.state.adminInfo.branch_id === '1'" prop="v_remark" label="最近回访说明" show-overflow-tooltip width="160">
          <template #default="scope">
            {{ scope.row.visit.length > 0 ? scope.row.visit[0]['remark'] : '' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" fixed="right">
          <template #default="scope">
            <el-button v-if="params.tab !== 'recyc'" v-permission="83" size="small" type="success" @click="handleDetail(scope.row.id)">详情 </el-button>
            <el-button v-if="params.tab !== 'recyc'" v-permission="80" size="small" type="primary" @click="$router.push('/order/edit/' + scope.row.id)">编辑 </el-button>
            <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo.branch_id !== '1'" type="primary" v-permission="80" size="small" @click="handleEdit(scope.row)"> 编辑 </el-button>
            <el-button v-if="params.tab !== 'recyc'" v-permission="87" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
            <el-button v-if="params.tab == 'recyc'" v-permission="88" size="small" type="success" @click="handleResave(scope.row.id)">恢复 </el-button>
            <el-button v-if="params.tab == 'recyc'" v-permission="128" size="small" type="danger" @click="handleDel(scope.row.id)"> 彻底删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 50, 100, 200]"
        :background="true"
        layout="total, sizes, prev, pager, next,slot, jumper"
        :total="count"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <FormDrawer :title="'订单' + drawerTitle" ref="formDrawerRef" @drawerClosed="drawerClosed" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" label-width="80px" :inline="false" size="small">
        <el-form-item label="客户姓名">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.name" />
        </el-form-item>
        <el-form-item label="具体地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="跟进设计师">
          <el-input v-model="form.designer" />
        </el-form-item>
        <el-form-item label="跟进信息">
          <el-row :gutter="2" v-for="(item, index) in form.follows" :key="item.key" style="width: 100%">
            <el-col :md="8" :offset="0">
              <el-date-picker
                style="width: 100%"
                v-model="item.follow_time"
                type="datetime"
                placeholder="请选择跟进时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                :editable="false"
                clearable
              />
            </el-col>
            <el-col :md="15" :offset="0">
              <el-input v-model="item.follow_note" placeholder="请输入跟进说明" minlength="2" maxlength="100" show-word-limit />
            </el-col>
            <el-col :span="1" :offset="0">
              <el-icon v-if="index == 0" @click="addFollow" size="24"><Plus /></el-icon>
              <el-icon v-else @click="minusFollow(index)" size="24"><Minus /></el-icon>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.status_id" placeholder="请选择订单状态" @change="statusChange">
            <el-option :disabled="item.status === 0" :value="item.id" :label="item.name" v-for="item in statusList" :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="交定时间">
          <el-date-picker
            style="width: 100%"
            v-model="form.deal_time"
            type="datetime"
            readonly
            placeholder="交定时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false"
            clearable
          />
        </el-form-item>
        <el-form-item label="定金金额">
          <el-input v-model="form.order_money" />
        </el-form-item>
        <el-form-item label="签约时间">
          <el-date-picker
            style="width: 100%"
            v-model="form.signing_time"
            type="datetime"
            placeholder="请选择签约时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false"
            clearable
          />
        </el-form-item>
        <el-form-item label="合同金额">
          <el-input v-model="form.contract_money" />
        </el-form-item>
        <el-form-item label="开工时间">
          <el-date-picker
            style="width: 100%"
            v-model="form.start_time"
            type="datetime"
            placeholder="请选择开工时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false"
            clearable
          />
        </el-form-item>
        <el-form-item label="完工时间">
          <el-date-picker
            style="width: 100%"
            v-model="form.end_time"
            type="datetime"
            placeholder="请选择完工时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false"
            clearable
          />
        </el-form-item>
        <el-form-item label="施工经理">
          <el-input v-model="form.construction_manager" />
        </el-form-item>
        <el-form-item label="质检">
          <el-input v-model="form.quality_man" />
        </el-form-item>
      </el-form>
    </FormDrawer>
    <detail ref="detailRef" :detail="details" />
    <el-dialog v-model="dialogVisible" title="审核未通过原因" width="40%">
      <div class="main">
        <div style="font-size: 14px; color: #333; line-height: 24px; margin: 0 0 15px">{{ reason }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogMoveVisible" destroy-on-close title="数据移动" width="60%" @close="moveDialogClose">
      <div class="main">
        <el-form :model="moveForm" ref="moveFormRef" label-width="80px">
          <el-tabs v-model="moveTab" @tab-change="moveTabChange">
            <el-tab-pane label="渠道来源" name="move_channel">
              <el-form-item label="渠道" prop="channel_id">
                <el-select v-model="moveForm.channel_id" placeholder="请选择渠道">
                  <el-option :disabled="item.status === 0" :value="item.id" :label="item.name" v-for="item in channel" :key="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="来源" prop="source_id">
                <el-select v-model="moveForm.source_id" placeholder="请选择来源">
                  <el-option :disabled="item.status === 0" :value="item.id" :label="item.name" v-for="item in sources" :key="item.id" />
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="接单公司" name="move_store">
              <el-form-item label="接单公司" prop="receive_company">
                <el-select v-model="moveForm.receive_company" filterable placeholder="请选择接单公司,可搜索">
                  <el-option :disabled="item.status === 2" :value="item.id" :label="item.name" v-for="item in branchList" :key="item.id" />
                </el-select>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogMoveVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="moveSubmit" :loading="loading"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import ListHeader from '@/components/ListHeader.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import detail from './detail.vue'
import { computed, reactive, ref, watch } from 'vue'
import order from '@/api/order'
import { toast, parseTime, time_init, elLoading, closeElLoading } from '@/utils/utils'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
import { useRoute } from 'vue-router'
const {
  loading,
  count,
  dataList,
  params,
  getData,
  handleCurrentChange,
  handleSizeChange,
  sortChange,
  handleDelete,
  handleSelectionChange,
  multipleTableRef,
  multiSelectionIds,
  handleResave,
  handleDel,
} = useInitTable({
  api: order,
  params: {
    page: 1,
    pageSize: 10,
    name: '',
    mobile: '',
    receive_company: null,
    order_time: '',
    province_id: '',
    city_id: '',
    channel_id: null,
    source_id: null,
    status_id: null,
    arrange_time: '',
    deal_time: '',
    invalid_tag: null,
    is_audit: null,
    is_visit: null,
    tab: 'all',
  },
  onGetListSuccess: (res) => {
    count.value = res.result.count
    dataList.value = res.result.data.map((o) => {
      o.arrange_time = parseTime(o.arrange_time, '{y}-{m}-{d} {h}:{i}')
      o.deal_time = parseTime(o.deal_time, '{y}-{m}-{d} {h}:{i}')
      o.follow_time = parseTime(parseInt(o.follow_time), '{y}-{m}-{d} {h}:{i}')
      o.visit_time = parseTime(parseInt(o.visit_time), '{y}-{m}-{d} {h}:{i}')
      return o
    })
  },
})
const { drawerTitle, editId, formDrawerRef, formRef, form, handleAdd, handleEdit, handleSubmit, drawerClosed } = useInitForm({
  api: order,
  getData,
  form: {
    name: '',
    mobile: '',
    province_id: '',
    city_id: '',
    area_id: '',
    address: '',
    type_id: '',
    layout_id: '',
    is_making: 0,
    size: '',
    demand: '',
    other: '',
    order_time: '',
    channel_id: '',
    source_id: '',
    invalid_tag: '',
    remark: '',
    ip: '',
    receive_company: '',
    receive_man: '',
    arrange_time: '',
    arrange_man: '',
    start_time: '',
    end_time: '',
    is_audit: 1,
    fail_reason: '',
    designer: '',
    follows: [{ follow_time: '', follow_note: '' }],
    is_amount: 0,
    status_id: 1,
    deal_time: '',
    order_money: 0,
    signing_time: '',
    contract_money: '',
    start_time: '',
    end_time: '',
    construction_manager: '',
    quality_man: '',
    is_visit: 1,
  },
  fliterParam: (row) => {
    if (channelList.value.length === 0) {
      getSelectData()
    }
    loadData(editId.value)
  },
  beforeSubmit: (from) => {
    let flag = false
    // 跟进信息数据处理
    if (form.follows.length > 1) {
      form.follows = form.follows.filter((item) => item.follow_time && item.follow_note)
    }
    form.follows.forEach((item) => {
      if (item.follow_time === '') {
        toast('请填写跟进时间', 'error')
        return
      }
      if (item.follow_note === '') {
        toast('请填写跟进说明', 'error')
        return
      }
      if (item.follow_time && item.follow_note) flag = true
    })
    if (form.status_id == 3 || form.status_id == 4 || form.status_id == 5 || form.status_id == 6) {
      if (form.order_money == 0) {
        toast('请填写订单金额', 'error')
        return false
      }
    }
    // 分公司更新--审核
    form.is_audit = 2
    if (flag) return form
  },
})
const loadData = (id) => {
  loading.value = true
  order
    .read(id)
    .then((res) => {
      if (res.code > 0) {
        const result = res.result
        if (!result) {
          toast('订单不存在', 'error')
          router.replace('/order/index').catch((err) => {})
          let index = tabList.findIndex((item) => item.path === '/order/edit/' + id)
          tabList.splice(index, 1)
          store.commit('setTabList', tabList)
        }
        console.log(res.result)
        for (const key in form) {
          form[key] = result[key]
        }
        form.order_time = parseTime(form.order_time)
        form.source_id = parseInt(form.source_id)
        form.arrange_time = parseTime(form.arrange_time)
        form.deal_time = parseTime(form.deal_time)
        form.signing_time = parseTime(form.signing_time)
        form.start_time = parseTime(form.start_time)
        form.end_time = parseTime(form.end_time)
        form.receive_company = form.receive_company === 0 ? '' : form.receive_company
        form.layout_id = form.layout_id === 0 ? '' : form.layout_id
        form.type_id = form.type_id === 0 ? '' : form.type_id
        form.follows = form.follows.map((item) => {
          return { follow_time: parseTime(item.follow_time), follow_note: item.follow_note }
        })
        form.follows.push({ follow_time: '', follow_note: '' })
        // form.visit = form.visit.map((item) => {
        //   return { visit_time: parseTime(item.visit_time), remark: item.remark }
        // })
        // form.visit.push({ visit_time: '', remark: '' })

        if (form.is_audit === 2 || form.is_audit === 3) {
          activeTab.value = 'follow'
        }
      } else {
        toast(res.message || 'error', 'error')
        return false
      }
    })
    .finally(() => {
      loading.value = false
    })
}
const addFollow = () => {
  form.follows.push({ follow_time: '', follow_note: '' })
}
const minusFollow = (index) => {
  form.follows.splice(index, 1)
}

// 移动
const dialogMoveVisible = ref(false)
const moveFormRef = ref(false)
const moveTab = ref('move_channel')
const moveForm = reactive({
  channel_id: '',
  source_id: '',
  receive_company: '',
})
const handMove = () => {
  if (multiSelectionIds.value.length == 0) {
    toast('请选择需要移动的数据', 'error')
    return
  }
  if (channelList.value.length === 0) {
    getSelectData()
  }
  dialogMoveVisible.value = true
}
const moveDialogClose = () => {
  moveForm.channel_id = ''
  moveForm.source_id = ''
  moveForm.receive_company = ''
}
const moveTabChange = () => {
  moveForm.channel_id = ''
  moveForm.source_id = ''
  moveForm.receive_company = ''
}
const sources = computed(() => {
  moveForm.source_id = ''
  if (moveForm.channel_id) {
    let sources = []
    channelList.value.forEach((item) => {
      if (moveForm.channel_id === item.id) {
        sources = item.children
      }
    })
    return sources
  } else {
    return []
  }
})

// 提交
const moveSubmit = () => {
  if (moveForm.source_id && !moveForm.channel_id) {
    toast('请选择渠道', 'error')
    return
  }
  if (moveForm.channel_id && !moveForm.source_id) {
    toast('请选择来源', 'error')
    return
  }

  loading.value = true
  order
    .move({ ids: multiSelectionIds.value, data: moveForm })
    .then((res) => {
      if (res.code > 0) {
        toast('数据移动成功')
        dialogMoveVisible.value = false
        getData()
      } else {
        toast(res.message || 'error', 'error')
        return false
      }
    })
    .finally(() => {
      loading.value = false
    })
}

// 导出
const exportExcel = () => {
  elLoading('数据导出中...')
  order
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

// 导入
const importExcel = (e) => {
  getData(1)
}
// 下载
const download = () => {
  location.href = '/template.xlsx'
}

// 交定时间
const statusChange = (status_id) => {
  console.log(status_id)
  if (status_id === 3 || status_id === 4 || status_id === 5 || status_id === 6) {
    if (!form.deal_time) form.deal_time = time_init()
  } else {
    form.deal_time = ''
  }
}
const dateFormatter = (row, column) => {
  return parseTime(row.order_time, '{y}-{m}-{d}')
}
const timeFormatter = (row, column) => {
  return parseTime(row.order_time, '{h}:{i}')
}
const areaFormatter = (row, column) => {
  return row.province_name + row.city_name
}

const dialogVisible = ref(false)
const reason = ref('')
// 查看审核失败原因
const failReason = (val) => {
  reason.value = val
  dialogVisible.value = true
}

const route = useRoute()
watch(
  route,
  () => {
    if (route.query.reload) {
      getData()
      // route.query.page ? getData(1) : getData()
    }
  },
  { deep: true, immediate: true }
)

// 订单状态
const audit = [
  {
    id: 1,
    name: '待跟进',
  },
  {
    id: 2,
    name: '待审核',
  },
  {
    id: 3,
    name: '审核未通过',
  },
  {
    id: 4,
    name: '审核通过',
  },
]
// 回访
const visit = [
  {
    id: 1,
    name: '待回访',
  },
  {
    id: 2,
    name: '无需回访',
  },
  {
    id: 3,
    name: '已回访',
  },
]

const channelList = ref([])
const channel = ref([])
const areaList = ref([])
const province = ref([])
const branchList = ref([])
const statusList = ref([])
const status = ref([])
const tag = ref([])
const branch = ref([])
const source = computed(() => {
  params.source_id = ''
  if (params.channel_id) {
    let source = []
    channelList.value.forEach((item) => {
      if (params.channel_id.includes(item.id)) {
        // source.push(...item.children)
        source.push({ label: item.name, options: [...item.children] })
      }
    })
    return source
  } else {
    return []
  }
})
const city = computed(() => {
  params.city_id = ''
  if (params.province_id) {
    let city = []
    try {
      areaList.value.forEach((item) => {
        if (item.id === params.province_id) {
          city = item.children
          throw new Error('break')
        }
      })
    } catch (error) {
      // 终止循环执行
    }
    return city
  } else {
    return []
  }
})

// 监听省市变化更新branch数据
watch([() => params.province_id, () => params.city_id], (newValue, oldValue) => {
  params.receive_company = ''
  if (newValue[1]) {
    branch.value = branchList.value.filter((o) => o.city_id === newValue[1])
  } else if (newValue[0]) {
    branch.value = branchList.value.filter((o) => o.province_id === newValue[0])
  } else {
    branch.value = branchList.value
  }
})

// 电话查询
const searchMobile = (mobile) => {
  params.page = 1
  params.mobile = mobile
  getData()
}

// 高级搜索
const showSearch = ref(false)
const searchMoreRef = ref()

watch(showSearch, (newVal) => {
  if (newVal && channelList.value.length === 0) {
    getSelectData()
  }
})

const getSelectData = () => {
  order.getSelect().then((res) => {
    if (res.code > 0) {
      channelList.value = res.result.channel
      res.result.channel.forEach((item) => {
        channel.value.push({ id: item.id, name: item.name })
      })
      areaList.value = res.result.area
      res.result.area.forEach((item) => {
        province.value.push({ id: item.id, areaname: item.areaname })
      })
      branch.value = branchList.value = res.result.branch
      status.value = res.result.status
      tag.value = res.result.tag
      tag.value.push({ id: 100, name: '其他' })
      statusList.value = res.result.status
    } else {
      toast(res.message || 'Error', 'error')
    }
  })
}

// 表单重置
const resetFrom = () => {
  if (!searchMoreRef.value) return
  // searchMoreRef.value.resetFields()
  params.page = 1
  params.pageSize = 10
  params.name = ''
  params.mobile = ''
  params.receive_company = null
  params.order_time = ''
  params.province_id = ''
  params.city_id = ''
  params.channel_id = null
  params.source_id = null
  params.status_id = null
  params.arrange_time = ''
  params.deal_time = ''
  params.invalid_tag = null
  params.is_audit = null
  params.is_visit = null
  getData(1)
}

// tabs切换
const tabbars = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'arrange',
    name: '派单',
  },
  {
    key: 'sign',
    name: '签单',
  },
  {
    key: 'recyc',
    name: '回收站',
  },
]

const detailRef = ref(null)
const details = ref(null)
// 详情
const handleDetail = (id) => {
  order
    .read(id)
    .then((res) => {
      if (res.code > 0) {
        res.result.arrange_time = parseTime(res.result.arrange_time)
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

// 高级搜索动画
const listeners = {
  // 元素由隐藏变为可见
  onEnter(/** @type {HTMLElement} */ el) {
    el.style.height = 'auto' // 将高度设为auto，是为了获取该元素的计算高度
    const endHeight = window.getComputedStyle(el).height // 计算高度
    el.style.height = '0px' // 将高度再设置为0
    el.offsetHeight // 强制重绘，重绘后再改变高度才会产生动画
    el.style.height = endHeight // 设置为计算高度
  },
  onAfterEnter(/** @type {HTMLElement} */ el) {
    el.style.height = null // 过渡进入之后，将高度恢复为null
  },
  // 元素由可见变为隐藏
  onLeave(/** @type {HTMLElement} */ el) {
    el.style.height = window.getComputedStyle(el).height // 计算高度
    el.offsetHeight // 强制重绘，重绘后再改变高度才会产生动画
    el.style.height = '0px' // 将高度设置为0
  },
  onAfterLeave(/** @type {HTMLElement} */ el) {
    el.style.height = null // 过渡离开之后，将高度恢复为null
  },
}
</script>
<style lang="scss" scoped>
.search-more {
  padding: 20px 20px 20px 0;
  margin-bottom: 20px;
  border: 1px solid #eee;
  overflow: hidden;
  transition: height 0.22s ease-in-out;
}
.el-tabs {
  margin-bottom: 10px;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
