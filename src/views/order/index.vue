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
                <el-select v-model="params.channel_id" placeholder="选择渠道" clearable multiple @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in channel" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="客户来源">
                <el-select v-model="params.source_id" placeholder="选择来源" clearable multiple @clear="getData(1)">
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
                <el-select v-model="params.province_id" filterable placeholder="选择区域" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.areaname" v-for="item in province" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="所在市">
                <el-select v-model="params.city_id" placeholder="选择区域" filterable clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.areaname" v-for="item in city" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="接单公司">
                <el-select v-model="params.receive_company" placeholder="选择公司" clearable multiple filterable @clear="getData(1)">
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
      <ListHeader @add="handleAdd" :rule="{ create: 79, move: 84, export: 81, import: 82, download: 82 }">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="small">
          <el-form-item v-show="!showSearch" label="">
            <el-input v-model="params.mobile" placeholder="输入手机号" clearable @clear="getData"></el-input>
          </el-form-item>
          <el-form-item v-show="!showSearch" label="">
            <el-select v-model="params.is_audit" placeholder="审核状态" clearable @clear="getData(1)">
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
        <el-table-column prop="channel_name" label="渠道" width="100" />
        <el-table-column prop="order_time_date" sortable label="下单日期" width="120" />
        <el-table-column prop="order_time_time" label="下单时间" width="100" />
        <el-table-column prop="source_name" label="来源" width="130" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="电话" width="140">
          <template #default="scope">
            <span @click="searchMobile(scope.row.mobile)" :class="scope.row.mobile_repeats > 1 ? 'red' : ''">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="120">
          <template #default="scope">
            <el-tag type="danger" style="color: #fb6a3a" v-if="scope.row.is_audit == '待跟进'">{{ scope.row.is_audit }}</el-tag>
            <el-tag type="warning" v-else-if="scope.row.is_audit == '待审核'">{{ scope.row.is_audit }}</el-tag>
            <el-tag @click="failReason(scope.row.fail_reason)" style="cursor: pointer" type="danger" v-else-if="scope.row.is_audit == '审核未通过'">{{ scope.row.is_audit }}</el-tag>
            <el-tag type="success" v-else-if="scope.row.is_audit == '审核通过'">{{ scope.row.is_audit }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="area" show-overflow-tooltip label="区域" width="140" />
        <el-table-column prop="address" show-overflow-tooltip label="详细地址" width="140" />
        <el-table-column prop="size" label="面积" width="120" />
        <el-table-column prop="arrange_time" sortable label="派单时间" width="150" />
        <el-table-column prop="branch_name" show-overflow-tooltip label="接单公司" width="140" />
        <el-table-column prop="status_name" label="订单状态" width="140" />
        <el-table-column prop="deal_time" sortable label="反馈交定时间" width="150" />
        <el-table-column prop="follow_time" sortable label="最新跟进时间" width="160" />
        <el-table-column prop="follow_note" show-overflow-tooltip label="最新跟进进展" width="180" />
        <el-table-column label="无效标签" width="160">
          <template #default="scope">
            <span style="color: #ff5722">{{ scope.row.invalid_tag }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_visit" label="客户回访" width="160" />
        <el-table-column prop="visit_time" sortable label="最近回访时间" width="150" />
        <el-table-column prop="v_remark" label="最近回访说明" show-overflow-tooltip width="160" />
        <el-table-column label="操作" width="210" fixed="right">
          <template #default="scope">
            <el-button v-if="params.tab != 'recyc'" v-permission="83" size="small" type="success" @click="handleEdit(scope.row)">详情 </el-button>
            <el-button v-if="params.tab != 'recyc'" v-permission="80" size="small" type="primary" @click="$router.push('/order/edit/' + scope.row.id)">编辑 </el-button>
            <el-button v-if="params.tab != 'recyc'" v-permission="87" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
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
  </div>
</template>
<script setup>
import ListHeader from '@/components/ListHeader.vue'
import { computed, ref, watch } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'
import order from '@/api/order'
import { toast } from '@/utils/utils'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
const { loading, count, dataList, params, getData, handleCurrentChange, handleSizeChange, sortChange, handleDelete, handleSelectionChange, multipleTableRef, handleResave, handleDel } = useInitTable({
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

const dialogVisible = ref(false)
const reason = ref('')
// 查看审核失败原因
const failReason = (val) => {
  reason.value = val
  dialogVisible.value = true
}

// const form = reactive({
//   meta: [{ key: '', value: '' }],
// })
// const addMeta = () => {
//   form.meta.push({ key: '', value: '' })
// }
// const minusMeta = (index) => {
//   form.meta.splice(index, 1)
// }

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
        if (item.id == params.province_id) {
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
    branch.value = branchList.value.filter((o) => o.city_id == newValue[1])
  } else if (newValue[0]) {
    branch.value = branchList.value.filter((o) => o.province_id == newValue[0])
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
  if (newVal && channelList.value.length == 0) {
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
</style>
