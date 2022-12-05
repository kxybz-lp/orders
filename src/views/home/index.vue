<template>
  <div class="app-container">
    <el-row v-permission="54" :gutter="20" class="panels">
      <template v-if="panels.length == 0">
        <el-col :xs="24" :md="12" :lg="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <div class="el-card-header">
                  <el-skeleton-item variant="text" style="width: 20%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
                <div class="el-card-body">
                  <div class="number">
                    <el-skeleton-item variant="text" style="width: 60%" />
                  </div>
                </div>
                <div class="el-card-footer">
                  <el-skeleton-item variant="text" style="width: 100%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :xs="24" :sm="12" :lg="6" :offset="0" v-for="(item, index) in panels"
        :key="item.title" :class="$store.state.isMobile ? 'mb15' : ''">
        <el-card shadow="hover" class="border-0">
          <div class="el-card-header">
            <span>{{ item.title }}</span>
            <el-tooltip :content="item.tooltip" placement="top">
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="el-card-body">
            <div class="number">
              <CountTo v-if="index != 3" :value="item.number" />
              <span v-else>{{ item.number }}</span>
            </div>
          </div>
          <div class="el-card-footer">
            <div class="s">
              <span>当日{{ item.title }}</span>
              <i>{{ item.current }}</i>
            </div>
            <div class="c">
              <el-icon v-if="item.type === 'up'" class="success">
                <CaretTop />
              </el-icon>
              <el-icon v-else class="fail">
                <CaretBottom />
              </el-icon>
              <span style="padding-left: 5px">{{ item.diff }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="statistical">
      <el-col :sapn="24">
        <el-card shadow="hover" :body-style="{ padding: 0 }">
          <template #header>
            <div class="statistical-header">
              <div class="type">
                <span :class="params.type == 'order' ? 'current_type' : ''"
                  @click="setType('order')">订单数</span>
                <span :class="params.type == 'arrange' ? 'current_type' : ''"
                  @click="setType('arrange')">派单数</span>
                <span :class="params.type == 'sign' ? 'current_type' : ''"
                  @click="setType('sign')">签单数</span>
              </div>
              <div class="date" v-show="!$store.state.isMobile">
                <span :class="params.scope == 'week' ? 'current_scope' : ''"
                  @click="setScope('week')">近7日</span>
                <span :class="params.scope == 'month' ? 'current_scope' : ''"
                  @click="setScope('month')">近30日</span>
                <span :class="params.scope == 'current_month' ? 'current_scope' : ''"
                  @click="setScope('current_month')">本月</span>
                <span :class="params.scope == 'year' ? 'current_scope' : ''"
                  @click="setScope('year')">本年</span>
                <el-date-picker v-model="params.range_time" type="daterange" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD" @change="switchRangeTime" size="default" />
              </div>
            </div>
          </template>
          <div class="statistical-body">
            <el-row :gutter="20">
              <el-col :md="24" :lg="18" :offset="0" v-permission="55">
                <div ref="chatBar" id="chart"></div>
              </el-col>
              <el-col :md="24" :lg="6" :offset="0" v-permission="56">
                <div class="branch_sort">
                  <div class="branch_sort-title">门店签单排名</div>
                  <div class="branch_sort-body">
                    <div class="branch_sort-item" v-for="(item, index) in store" :key="index">
                      <div class="sort-name">
                        <span class="sort" :class="index < 3 ? 'active' : ''">{{ index + 1 }}</span>
                        <span class="name">{{ item.name }}</span>
                      </div>
                      <div class="value">
                        <span class="number">{{ item.total }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :md="24" :lg="14" :offset="0" v-permission="55">
        <el-card shadow="hover">
          <template #header>
            <div>
              <span>渠道统计</span>
            </div>
          </template>
          <div ref="chatPie" id="pie"></div>
        </el-card>
      </el-col>
      <el-col :md="24" :lg="10" :offset="0" v-permission="127">
        <el-card shadow="hover">
          <template #header>
            <div>
              <span>系统公告</span>
            </div>
          </template>
          <div id="notice">
            <div class="notice-item" v-for="item in notice" :key="item.id"
              @click="readNotice(item)">
              <div class="title">{{ item.title }}</div>
              <div class="time">{{ item.create_time }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" :title="noticeDetail.title" width="40%">
      <div class="main">
        <div style="font-size: 14px; color: #333; line-height: 24px; margin: 0 0 15px">
          {{ noticeDetail.content }}</div>
        <div style="font-size: 14px; color: #666">发布时间:{{ noticeDetail.create_time }}</div>
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
import CountTo from '@/components/CountTo.vue'
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { BarChart, PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import home from '@/api/home'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import moment from 'moment'

const panels = ref([])
const notice = ref([])
const tooltip_name = ref('订单数')
const store = ref(null)
const chatBar = ref(null)
const chatPie = ref(null)
const params = reactive({
  type: 'order',
  scope: 'week',
  range_time: '',
})
// 当天日期
const currentDay = moment().format('YYYY-MM-DD')
// 6天前日期,近7日
const weekDay = moment().add(-6, 'd').format('YYYY-MM-DD')
// 29天前日期,近3日
const week30Day = moment().add(-29, 'd').format('YYYY-MM-DD')
// 当月1号日期
const monthStartDay = moment().startOf('month').format('YYYY-MM-DD')
// 当月最后一天日期
const monthEndDay = moment().endOf('month').format('YYYY-MM-DD')
// 当年第一天日期
const yearStartDay = moment().startOf('year').format('YYYY-MM-DD')
// 设置默认近7日
params.range_time = [weekDay, currentDay]
// console.log(moment().format('YYYY-MM-DD'))
// console.log(currentDay, weekDay, monthStartDay, monthEndDay, yearStartDay)
// 面板数据
home.getPanels().then((res) => {
  panels.value = res.result
})
// 签单门店数据
home.getBranch().then((res) => {
  store.value = res.result
})
// 公告数据
home.getNotice().then((res) => {
  notice.value = res.result
})

const setType = (val) => {
  params.type = val
  switch (val) {
    case 'order':
      tooltip_name.value = '订单数'
      break
    case 'arrange':
      tooltip_name.value = '派单数'
      break
    case 'sign':
      tooltip_name.value = '签单数'
      break
    default:
      tooltip_name.value = '订单数'
      break
  }
  getBarData()
}
const setScope = (val) => {
  switch (val) {
    case 'week':
      params.range_time = [weekDay, currentDay]
      break
    case 'month':
      params.range_time = [week30Day, currentDay]
      break
    case 'current_month':
      params.range_time = [monthStartDay, currentDay]
      break
    case 'year':
      params.range_time = [yearStartDay, currentDay]
      break
    default:
      params.range_time = [weekDay, currentDay]
      break
  }
  params.scope = val
  getBarData()
}
const switchRangeTime = (val) => {
  if (val) {
    params.scope = ''
  } else {
    params.scope = 'week'
  }
  getBarData()
}
echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer, LegendComponent, PieChart, LabelLayout])
let chartBar = null
let chartPie = null
onMounted(() => {
  if (chatBar.value) {
    chartBar = echarts.init(chatBar.value)
    getBarData()
  }
  if (chatPie.value) {
    chartPie = echarts.init(chatPie.value)
    getPieData()
  }
})
onUnmounted(() => {
  // 页面卸载销毁echarts
  if (chartBar) {
    echarts.dispose()
  }
})
// 柱状图数据
const getBarData = () => {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '2%',
      top: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: '#004c59',
        },
        data: [],
      },
    ],
  }
  chartBar.showLoading()
  home
    .getBarData(params)
    .then((res) => {
      option.xAxis[0].data = res.result.x
      option.series[0].data = res.result.y
      option.series[0].name = res.result.tooltip_name
      chartBar.setOption(option)
    })
    .finally(() => {
      chartBar.hideLoading()
    })
}
// 饼状图数据
const getPieData = () => {
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '渠道统计',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  chartBar.showLoading()
  home
    .getPieData(params)
    .then((res) => {
      option.series[0].data = res.result
      chartPie.setOption(option)
    })
    .finally(() => {
      chartPie.hideLoading()
    })
}

// 查看公告详情
const dialogVisible = ref(false)
const noticeDetail = ref([])
const readNotice = (item) => {
  noticeDetail.value = item
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.panels {
  .el-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
    .el-icon {
      color: #999;
    }
  }
  .el-card-body {
    .number {
      height: 38px;
      margin-top: 4px;
      margin-bottom: 0;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.85);
      font-size: 30px;
      line-height: 38px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
  .el-card-footer {
    margin-top: 8px;
    padding-top: 9px;
    border-top: 1px solid #f0f0f0;
    font-size: 12px;
    height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-style: normal;
      padding-left: 8px;
      color: rgba(0, 0, 0, 0.85);
    }
    .el-icon {
      width: 20px;
      height: 20px;
      position: relative;
      top: 2px;
    }
    .success {
      color: #67c23a;
    }
    .fail {
      color: #f56c6c;
    }
  }
}
.statistical {
  margin: 15px 0;
  .statistical-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .type {
      cursor: pointer;
      span {
        padding-right: 15px;
      }
    }
    .date {
      cursor: pointer;
      span {
        padding-right: 15px;
      }
    }
    .current_type,
    .current_scope {
      color: var(--color);
    }
  }
  :deep(.el-card__body) {
    padding: 0 20px 20px !important;
  }
  .statistical-body {
    #chart {
      width: 100%;
      height: 370px;
    }
  }
  .branch_sort {
    padding: 20px 0 0 0;
    .branch_sort-title {
      font-size: 14px;
      color: var(--color);
      margin-bottom: 15px;
      font-weight: 500;
    }
    .branch_sort-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      color: #333;
      margin-top: 10px;
      .sort-name {
        display: flex;
        align-items: center;
      }
      .sort {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 1.5px;
        margin-right: 16px;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        background-color: #fafafa;
        border-radius: 20px;
      }
      .active {
        color: #fff;
        background-color: var(--color);
      }
      .name {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
#pie,
#notice {
  height: 370px;
}
.notice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  cursor: pointer;
  .title {
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .time {
    padding-left: 10px;
    font-size: 14px;
    color: #666;
  }
}
.notice-item:hover {
  .title,
  .time {
    color: var(--color);
  }
}
</style>
