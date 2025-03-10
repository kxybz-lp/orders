<template>
  <el-drawer v-model="showDrawer" size="100%" :close-on-click-modal="false" destroy-on-close
    @closed="drawerClosed">
    <template #header="{ }">
      <div class="detail-header">
        <h4>订单导出详情</h4>
      </div>
    </template>
    <div class="detailDrawer" style="padding: 5px 15px;">
      <div class="body">
        <el-descriptions :column="1">
          <el-descriptions-item label="审核状态：">
            <el-tag size="small" type="warning" v-if="detail.export_status == 1">待审核</el-tag>
            <el-tag size="small" type="success" v-if="detail.export_status == 2">审核通过</el-tag>
            <el-tag size="small" type="danger" v-if="detail.export_status == 3">审核未通过</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="用户名：">{{ detail.export_admin_name }} </el-descriptions-item>
          <el-descriptions-item label="公司">{{ detail.export_branch_name }} </el-descriptions-item>
          <el-descriptions-item label="导出时间">{{ detail.create_time }} </el-descriptions-item>
          <el-descriptions-item label="导出订单数">{{ detail.export_total_num }} </el-descriptions-item>
          <el-descriptions-item label="导出原因">{{ detail.export_remark }} </el-descriptions-item>
          <el-descriptions-item label="筛选条件">
            <el-descriptions :column="1" style="padding-left: 80px;">
              <el-descriptions-item label="下单时间："
                v-if="detail.export_filter.order_time">{{ detail.export_filter.order_time[0] }}
                - {{ detail.export_filter.order_time[1] }}
              </el-descriptions-item>
              <el-descriptions-item label="下单时间："
                v-if="detail.export_filter.order_time_start">{{ detail.export_filter.order_time_start}}
                - {{ detail.export_filter.order_time_end }}
              </el-descriptions-item>
              <el-descriptions-item label="派单时间："
                v-if="detail.export_filter.arrange_time">{{ detail.export_filter.arrange_time[0] }}
                - {{ detail.export_filter.arrange_time[1] }}
              </el-descriptions-item>
              <el-descriptions-item label="下单时间："
                v-if="detail.export_filter.arrange_time_start">{{ detail.export_filter.arrange_time_start}}
                - {{ detail.export_filter.arrange_time_end }}
              </el-descriptions-item>
              <el-descriptions-item label="签单时间："
                v-if="detail.export_filter.deal_time">{{ detail.export_filter.deal_time[0] }}
                - {{ detail.export_filter.deal_time[1] }}
              </el-descriptions-item>
              <el-descriptions-item label="下单时间："
                v-if="detail.export_filter.deal_time_start">{{ detail.export_filter.deal_time_start}}
                - {{ detail.export_filter.deal_time_end }}
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="公司对接人">{{ detail.docking_man }} </el-descriptions-item>
          <el-descriptions-item label="公司对接人电话">{{ detail.docking_phone }} </el-descriptions-item>
          <el-descriptions-item label="公司负责人">{{ detail.respon_man }} </el-descriptions-item>
          <el-descriptions-item label="公司负责人电话">{{ detail.respon_phone }} </el-descriptions-item>
          <el-descriptions-item label="审核时间">{{ detail.examine_time }} </el-descriptions-item>
          <el-descriptions-item label="审核人">{{ detail.examine_admin_name }} </el-descriptions-item>
          <el-descriptions-item label="下载次数">{{ detail.export_num }} </el-descriptions-item>
        </el-descriptions>
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
  //   detailTab.value = 'detail_order'
}

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