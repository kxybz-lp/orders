<template>
  <el-drawer v-model="showDrawer" size="100%" :close-on-click-modal="false" destroy-on-close @closed="drawerClosed">
    <template #header="{}">
      <div class="detail-header">
        <h4>订单详情</h4>
        <div class="button" v-if="$store.state.adminInfo.branch_id === '1'" v-permission="80" @click="$router.push('/order/edit/' + detail.id)">
          <el-icon :size="20">
            <Edit />
          </el-icon>
        </div>
        <div class="button" v-if="$store.state.adminInfo.branch_id !== '1'" v-permission="80" @click="follow(detail)">
          <el-icon :size="20">
            <Edit />
          </el-icon>
        </div>
      </div>
    </template>
    <div class="detailDrawer" style="padding: 5px 15px">
      <div class="body">
        <el-tabs v-model="detailTab">
          <el-tab-pane label="订单信息" name="detail_order">
            <el-descriptions :column="1">
              <el-descriptions-item label="审核状态：">
                <el-tag type="danger" style="color: #fb6a3a" v-if="detail.is_audit === 1">待跟进 </el-tag>
                <el-tag type="warning" v-else-if="detail.is_audit === 2">待审核</el-tag>
                <el-tag type="danger" v-else-if="detail.is_audit === 3">审核未通过</el-tag>
                <el-tag type="success" v-else-if="detail.is_audit === 4">审核通过</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="审核失败原因：" v-if="detail.is_audit == 3"> {{ detail.fail_reason }} </el-descriptions-item>
              <el-descriptions-item label="订单类型：">{{ detail.type }} </el-descriptions-item>
              <el-descriptions-item label="派单类型：">
                <span v-if="detail.arrange_type == 1">客服派单</span>
                <span v-if="detail.arrange_type == 2" style="color: #f00">系统派单</span>
              </el-descriptions-item>
              <el-descriptions-item label="客户名称：">{{ detail.name }} </el-descriptions-item>
              <el-descriptions-item label="联系方式："
                ><span v-mobile="detail.mobile">{{ detail.mobile }}</span
                ><span v-if="$store.state.adminInfo.role_id == 3 || $store.state.adminInfo.role_id == 4 || $store.state.adminInfo.role_id == 5 || $store.state.adminInfo.role_id == 6"
                  ><el-tag v-if="!$store.state.isMobile" style="margin-left: 5px; cursor: pointer" v-copy="detail.mobile" type="info">复制手机号</el-tag
                  ><el-tag v-else style="margin-left: 5px; cursor: pointer" type="success" @click="callphone(detail.mobile)">拨打电话</el-tag></span
                ></el-descriptions-item
              >
              <el-descriptions-item label="房屋地址："> {{ detail.province_name }}{{ detail.city_name }}{{ detail.address }} </el-descriptions-item>
              <el-descriptions-item label="下单时间：">{{ parseTime(detail.order_time) }} </el-descriptions-item>
              <el-descriptions-item label="房屋类型：">{{ detail.type_name }} </el-descriptions-item>
              <el-descriptions-item label="房屋户型：">{{ detail.layout_name }} </el-descriptions-item>
              <el-descriptions-item label="房屋面积：">{{ detail.size }} </el-descriptions-item>
              <el-descriptions-item label="是否交房：">
                <el-tag v-if="detail.is_making === 0">未获知</el-tag>
                <el-tag type="warning" v-else-if="detail.is_making === 1">未交房</el-tag>
                <el-tag type="success" v-else-if="detail.is_making === 2">已交房</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="装修需求：">{{ detail.demand }} </el-descriptions-item>
              <el-descriptions-item label="其他：">{{ detail.other }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="推广渠道："> {{ detail.channel_name }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="客户来源："> {{ detail.source_name }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="无效标签："> {{ detail.invalid_tag }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="推广标识："> {{ detail.remark }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="录入者："> {{ detail.user_name }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="录入时间："> {{ detail.create_time }} </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="派单信息" name="detail_arrange">
            <el-descriptions :column="1">
              <el-descriptions-item label="派单时间：">{{ parseTime(detail.arrange_time) }} </el-descriptions-item>
              <el-descriptions-item v-if="$store.state.adminInfo.branch_id === '1'" label="派单人："> {{ detail.arrange_man_as }}</el-descriptions-item>
              <el-descriptions-item label="接单公司：">{{ detail.branch_name }}</el-descriptions-item>
              <el-descriptions-item label="接单人：">{{ detail.receive_man }}</el-descriptions-item>
            </el-descriptions>
            <template v-if="detail.arrange_info && $store.state.adminInfo.branch_id === '1'">
              <div v-for="(item, index) in detail.arrange_info" v-bind:key="item.arrange_time">
                <el-divider />
                <p style="font-size: 14px; margin-bottom: 20px; color: #606266">第{{ index + 1 }}次派单信息</p>
                <el-descriptions :column="1">
                  <el-descriptions-item label="派单时间：">{{ parseTime(item.arrange_time) }} </el-descriptions-item>
                  <el-descriptions-item label="接单公司：">{{ item.company_name }}</el-descriptions-item>
                  <el-descriptions-item label="跟进时间：">{{ item.follow[0].time }}</el-descriptions-item>
                  <el-descriptions-item label="跟进信息：">{{ item.follow[0].note }}</el-descriptions-item>
                  <el-descriptions-item label="死单标签：">{{ item.reason_name }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="跟进信息" name="detail_follow">
            <el-descriptions :column="1">
              <el-descriptions-item label="跟进设计师：">{{ detail.designer }}</el-descriptions-item>
              <el-descriptions-item label="跟进信息："></el-descriptions-item>
              <el-descriptions-item v-if="detail.follows.length > 0">
                <el-descriptions style="margin-left: 0px; margin-top: -20px" :column="1" border>
                  <template v-for="item in detail.follows" :key="item.id">
                    <el-descriptions-item label="跟进时间">{{ parseTime(item.follow_time) }} </el-descriptions-item>
                    <el-descriptions-item label="跟进说明">{{ item.follow_note }}</el-descriptions-item>
                  </template>
                </el-descriptions>
              </el-descriptions-item>
              <el-descriptions-item label="是否量房：">
                <el-tag v-if="detail.is_amount === 0">未获知</el-tag>
                <el-tag type="warning" v-else-if="detail.is_amount === 1">未量房</el-tag>
                <el-tag type="success" v-else-if="detail.is_amount === 2">已量房</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="订单状态：">{{ detail.status_name }}</el-descriptions-item>
              <el-descriptions-item label="死单原因：" v-if="detail.status_id == 8"> {{ detail.reason_name }} </el-descriptions-item>
              <el-descriptions-item label="反馈交定时间:">{{ parseTime(detail.deal_time) }} </el-descriptions-item>
              <el-descriptions-item label="定金金额:">{{ detail.order_money }}</el-descriptions-item>
              <el-descriptions-item label="签约时间:">{{ parseTime(detail.signing_time) }} </el-descriptions-item>
              <el-descriptions-item label="合同金额：">{{ detail.contract_money }}</el-descriptions-item>
              <el-descriptions-item label="开工时间：">{{ parseTime(detail.start_time) }} </el-descriptions-item>
              <el-descriptions-item label="完工时间：">{{ parseTime(detail.end_time) }} </el-descriptions-item>
              <el-descriptions-item label="施工经理：">{{ detail.construction_manager }} </el-descriptions-item>
              <el-descriptions-item label="质检：">{{ detail.quality_man }}</el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane v-if="$store.state.adminInfo.branch_id === '1'" label="回访信息" name="detail_visit">
            <el-descriptions :column="1">
              <el-descriptions-item label="客户回访：">
                <el-tag type="warning" v-if="detail.is_visit === 1">待回访</el-tag>
                <el-tag v-else-if="detail.is_visit === 2">无需回访</el-tag>
                <el-tag type="success" v-else-if="detail.is_visit === 3">已回访</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="回访信息：">
                <el-descriptions style="margin-left: 115px" :column="1" border>
                  <template v-for="item in detail.visit" v-bind:key="item.visit_time">
                    <el-descriptions-item label="回访时间">{{ parseTime(item.visit_time) }} </el-descriptions-item>
                    <el-descriptions-item label="回访说明">{{ item.remark }}</el-descriptions-item>
                  </template>
                </el-descriptions>
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
import { parseTime, toast } from '@/utils/utils'
const prop = defineProps({
  detail: {
    type: Object,
    default: '',
  },
})

const detailTab = ref('detail_order')
const showDrawer = ref(false)

const loading = ref(false)
const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)

// 打开
const openDrawer = () => (showDrawer.value = true)

// 关闭
const drawerClosed = () => {
  detailTab.value = 'detail_order'
}

// 拨打手机号
const callphone = (mobile) => {
  window.location.href = 'tel://' + mobile
}

// 提交
const emit = defineEmits(['follow'])
const follow = (row) => emit('follow', row)

defineExpose({
  openDrawer,
  showLoading,
  hideLoading,
})
</script>
<style lang="scss" scoped>
:deep(.el-descriptions__label:not(.is-bordered-label)) {
  display: inline-block;
  width: 100px;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}
.detail-header h4 {
  font-size: 18px;
  color: 303133;
}
.detail-header .button {
  margin-top: 4px;
  cursor: pointer;
}
</style>
