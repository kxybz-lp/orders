<template>
  <el-drawer v-model="showFollowDrawer" title="订单跟进" size="100%" :close-on-click-modal="false"
    destroy-on-close @closed="CloseFollowDrawer">
    <el-scrollbar>
      <el-form :model="form" ref="formFollowRef" label-width="80px"
        :label-position="$store.state.isMobile ? 'top' : 'right'" style="padding: 15px;">
        <div v-if="form.is_audit == 3" style="margin-bottom: 10px;color: #f56c6c;"><span
            style="font-weight:700;font-size: 14px;">审核失败原因：{{form.fail_reason}}</span>
        </div>
        <el-form-item label="客户姓名">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.name" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.mobile" readonly>
            <template #append>
              <span style="cursor: pointer;" v-if="$store.state.isMobile"
                @click="callphone(form.mobile)">拨打电话</span>
              <span style="cursor: pointer;" v-else v-copy="form.mobile">复制联系方式</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="具体地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="是否量房" prop="is_amount">
          <el-radio-group v-model="form.is_amount">
            <el-radio :label="1">未量房</el-radio>
            <el-radio :label="2">已量房</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="房屋面积">
          <el-input v-model="form.size" />
        </el-form-item>
        <el-form-item label="跟单人" v-if="form.receive_company == 215">
          <el-input v-model="form.receive_man" placeholder="跟单人" />
        </el-form-item>
        <el-form-item label="设计师">
          <el-input v-model="form.designer" placeholder="跟进设计师" />
        </el-form-item>
        <el-form-item label="跟进信息" class="red">
          <el-row :gutter="2" v-for="(item, index) in form.follows" :key="item.key"
            style="width: 100%;margin-bottom: 8px;">
            <el-col :md="8" :offset="0">
              <el-date-picker style="width: 100%" v-model="item.follow_time" type="datetime"
                placeholder="请选择跟进时间" format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable readonly
                :disabled-date="disabledDate" />
            </el-col>
            <el-col :md="16" :offset="0" :class="$store.state.isMobile ? 'mt5' : ''">
              <el-input v-model="item.follow_note" type="textarea"
                :rows="$store.state.isMobile ? 3 : 1" :readonly="item.readonly"
                placeholder="请输入跟进说明" minlength="2" maxlength="100" show-word-limit />
            </el-col>
            <!-- <el-col :span="1" :offset="0">
              <el-icon v-if="index == 0" @click="addFollow" :size="20" style="padding-top: 5px;">
                <CirclePlusFilled />
              </el-icon>
              <el-icon v-if="index != 0 && $store.state.adminInfo.branch_id === '1'"
                @click="minusFollow(index)" :size="20">
                <Minus />
              </el-icon>
            </el-col> -->
          </el-row>
          <el-button type="warning" size="small" style="margin: 10px 0 0 0;"
            @click="addFollow">添加跟进信息</el-button>
        </el-form-item>
        <el-form-item label="订单状态" class="red">
          <el-select v-model="form.status_id" placeholder="请选择订单状态" @change="statusChange">
            <el-option :disabled="item.status === 0" :value="item.id" :label="item.name"
              v-for="item in statusList" :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="死单标签" prop="reason_id" v-if="form.status_id==8">
          <el-select v-model="form.reason_id" placeholder="请选择死单标签">
            <el-option :value="item.id" :label="item.name" v-for="item in reasonList"
              :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="交定时间">
          <el-date-picker style="width: 100%" v-model="form.deal_time" type="datetime" readonly
            placeholder="自动获取反馈交定时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false" clearable />
        </el-form-item>
        <el-form-item label="定金金额">
          <el-input v-model="form.order_money" type="number" :readonly="has_money" />
        </el-form-item>
        <el-form-item label="签约时间">
          <el-date-picker style="width: 100%" v-model="form.signing_time" type="datetime"
            placeholder="请选择签约时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false" :disabled-date="disabledDate" clearable />
        </el-form-item>
        <el-form-item label="合同金额">
          <el-input v-model="form.contract_money" type="number" />
        </el-form-item>
        <el-form-item label="开工时间">
          <el-date-picker style="width: 100%" v-model="form.start_time" type="datetime"
            placeholder="请选择开工时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false" clearable />
        </el-form-item>
        <el-form-item label="完工时间">
          <el-date-picker style="width: 100%" v-model="form.end_time" type="datetime"
            placeholder="请选择完工时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            :editable="false" clearable />
        </el-form-item>
        <el-form-item label="施工经理">
          <el-input v-model="form.construction_manager" />
        </el-form-item>
        <el-form-item label="质检">
          <el-input v-model="form.quality_man" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="drawer-footer">
        <el-button @click="CloseFollowDrawer">取消</el-button>
        <el-button style="margin-left:15px;" type="primary" @click="submit" :loading="loading">
          提交
        </el-button>
      </span>
    </template>
  </el-drawer>
</template>
  <script setup>
import { parseTime, showModal, time_init, toast } from '@/utils/utils'
import order from '@/api/order'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// 订单跟进
const form = reactive({
  name: '',
  mobile: '',
  is_audit: null,
  fail_reason: '',
  address: '',
  size: '',
  designer: '',
  receive_man: '',
  receive_company: '',
  follows: [{ follow_time: '', follow_note: '' }],
  status_id: 1,
  is_amount: 0,
  reason_id: 0,
  deal_time: '',
  order_money: '',
  signing_time: '',
  contract_money: '',
  start_time: '',
  end_time: '',
  construction_manager: '',
  quality_man: '',
})

const showFollowDrawer = ref(false)
const formFollowRef = ref('')
const orderId = ref('')

const loading = ref(false)
const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)
let status__id = 2
let has_money = ref(false)

const statusList = ref([])
const reasonList = ref([])

onMounted(() => {
  if (store.state.adminInfo.branch_id != 1) {
    if (store.state.statusList) {
      statusList.value = store.state.statusList
    } else {
      order.getStatus().then((res) => {
        statusList.value = res.result
        store.commit('setStatusList', res.result)
      })
    }
    order.getReason().then((res) => {
      reasonList.value = res.result
    })
  }
})

// 交定时间
const statusChange = (status_id) => {
  if (status_id === 3 || status_id === 4 || status_id === 5 || status_id === 6) {
    let statuss = statusList.value.find((item) => item.id == status_id)
    if (!form.deal_time) {
      showModal('确认将订单状态修为' + statuss.name + '吗?')
        .then((res) => {
          form.deal_time = time_init()
        })
        .catch((err) => {
          form.status_id = status__id
        })
    }
  } else {
    // form.deal_time = ''
  }
  if (status_id != 8) {
    form.reason_id = ''
  }
}

const addFollow = () => {
  form.follows.push({ follow_time: time_init(), follow_note: '', readonly: false })
}
const minusFollow = (index) => {
  form.follows.splice(index, 1)
}

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

// 拨打手机号
const callphone = (mobile) => {
  window.location.href = 'tel://' + mobile
}

// 打开
const openFollowDrawer = (order_id) => {
  orderId.value = order_id
  order.read(order_id).then((res) => {
    if (res.code > 0) {
      let result = res.result
      for (const key in form) {
        form[key] = result[key]
      }
      form.deal_time = parseTime(form.deal_time)
      form.signing_time = parseTime(form.signing_time)
      form.start_time = parseTime(form.start_time)
      form.end_time = parseTime(form.end_time)
      form.follows = form.follows.map((item) => {
        return { follow_time: parseTime(item.follow_time), follow_note: item.follow_note, readonly: true }
      })
      form.follows.push({ follow_time: time_init(), follow_note: '' })
      has_money.value = form.order_money == 0 ? false : true
      form.order_money = form.order_money == 0 ? '' : form.order_money
      form.contract_money = form.contract_money == 0 ? '' : form.contract_money
      form.reason_id = form.reason_id === 0 ? '' : form.reason_id
      showFollowDrawer.value = true
      status__id = form.status_id
    } else {
      toast(res.message || 'error', 'error')
      return false
    }
  })
}

// 提交
const emit = defineEmits(['closeFollow'])

// 关闭
const CloseFollowDrawer = () => {
  loading.value = false
  showFollowDrawer.value = false
  emit('closeFollow', false)
}

const submit = () => {
  // 分公司更新--审核
  form.is_audit = 2
  form.size = parseInt(form.size)
  if (form.status_id == 1) {
    toast('请修改订单状态', 'error')
    return false
  }
  if (form.is_amount == 0) {
    toast('请修改量房信息', 'error')
    return false
  }

  // if (form.size && typeof form.size !== 'number') {
  //   toast('面积格式为整数', 'error')
  //   return false
  // }
  if (form.status_id == 3 || form.status_id == 4 || form.status_id == 5 || form.status_id == 6) {
    if (form.order_money == 0) {
      toast('请填写订单金额', 'error')
      return false
    }
    if (!form.size) {
      toast('请填写面积', 'error')
      return false
    }
  }
  if (form.status_id == 7 && !form.deal_time) {
    toast('未交定订单无法修改订单状态为退定金', 'error')
    return false
  }
  if (isNaN(form.size)) {
    toast('房屋面积必须是数字', 'error')
    return false
  }

  // 跟进信息数据处理
  let follow = form.follows.filter((item) => item.follow_time && item.follow_note)
  // 后台会自动删除空数组，导致报错
  if (follow.length === 0) {
    toast('请填写跟进信息', 'error')
    return false
  }
  form.follows = follow

  // 死单标签处理
  if (form.status_id == 8 && !form.reason_id) {
    toast('请选择死单标签', 'error')
    return false
  }

  loading.value = true
  order
    .follow(orderId.value, form)
    .then((res) => {
      if (res.code > 0) {
        toast('数据更新成功')
        for (const key in form) {
          form[key] = ''
        }
        form.follows = [{ follow_time: '', follow_note: '' }]
        form.status_id = 1
        showFollowDrawer.value = false
        emit('closeFollow', true)
        //获取通知消息
        store.dispatch('getNote')
      } else {
        toast(res.message || 'error', 'error')
        emit('closeFollow', false)
        return false
      }
    })
    .finally(() => {
      loading.value = false
    })
}

defineExpose({
  openFollowDrawer,
  CloseFollowDrawer,
  showLoading,
  hideLoading,
})
</script>
 <style lang="scss" scoped>
.el-drawer__header {
  padding-bottom: 16px;
  border-bottom: 1px solid #f5f5f5;
}
:deep(.el-form-item__label) {
  font-weight: 700 !important;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
.red :deep(.el-form-item__label) {
  color: #f56c6c;
}
.mt5 {
  margin-top: 5px;
}
// .el-drawer__footer {
//   padding-top: 20px;
//   border-top: 1px solid #f5f5f5 !important;
//   box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
// }
</style>