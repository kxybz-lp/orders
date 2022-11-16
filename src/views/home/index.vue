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
      <el-col :xs="24" :sm="12" :lg="6" :offset="0" v-for="(item, index) in panels" :key="item.title">
        <el-card shadow="hover" class="border-0">
          <div class="el-card-header">
            <span>{{ item.title }}</span>
            <el-tooltip :content="item.tooltip" placement="top">
              <el-icon><Warning /></el-icon>
            </el-tooltip>
          </div>
          <div class="el-card-body">
            <div class="number">
              <CountTo v-if="index != 3" :value="item.total" />
              <span v-else>{{ item.total }}</span>
            </div>
          </div>
          <div class="el-card-footer">
            <div class="s">
              <span>当日{{ item.title }}</span>
              <i>{{ item.number }}</i>
            </div>
            <div class="c">
              <el-icon v-if="item.type === 'up'" class="success"><CaretTop /></el-icon>
              <el-icon v-else class="fail"><CaretBottom /></el-icon>
              <span style="padding-left: 5px">10%</span>
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
                <span :class="params.type == 'order' ? 'current_type' : ''" @click="setType('order')">订单数</span>
                <span :class="params.type == 'arrange' ? 'current_type' : ''" @click="setType('arrange')">派单数</span>
                <span :class="params.type == 'sign' ? 'current_type' : ''" @click="setType('sign')">签单数</span>
              </div>
              <div class="date">
                <span :class="params.scope == 'week' ? 'current_scope' : ''" @click="setScope('week')">近7日</span>
                <span :class="params.scope == 'month' ? 'current_scope' : ''" @click="setScope('month')">本月</span>
                <span :class="params.scope == 'year' ? 'current_scope' : ''" @click="setScope('year')">本年</span>
                <el-date-picker
                  v-model="params.range_time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  @change="switchRangeTime"
                  size="default"
                />
              </div>
            </div>
          </template>
          <div class="statistical-body">
            <el-row :gutter="20">
              <el-col :md="24" :lg="18" :span="18" :offset="0" v-permission="55">
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
                        <span class="number">{{ item.number }}</span>
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
  </div>
</template>

<script setup>
import CountTo from '@/components/CountTo.vue'
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import home from '@/api/home'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const panels = ref([])
const tooltip_name = ref('订单数')
const store = ref(null)
const chatBar = ref(null)
const params = reactive({
  type: 'order',
  scope: 'week',
  range_time: '',
})

// 面板数据
home.getPanels().then((res) => {
  panels.value = res.result
})
// 签单门店数据
home.getBranch().then((res) => {
  store.value = res.result
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
  console.log(tooltip_name.value)
  getBarData()
}
const setScope = (val) => {
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
echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer])
let chartBar = null
onMounted(() => {
  if (chatBar.value) {
    chartBar = echarts.init(chatBar.value)
    getBarData()
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
</style>
