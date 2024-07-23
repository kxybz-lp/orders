<template>
  <div :class="$store.state.isMobile && params.tab == 'deal' ? 'scroll-container' : ''">
    <div class="app-container" @scroll="handleScroll">
      <el-card class="admin-card" shadow="hover" :class="params.tab === 'state' ? 'state' : ''">
        <el-tabs v-model="params.tab" @tab-change="handleTabChange" v-permission="146">
          <el-tab-pane :label="item.name" :name="item.key" v-for="item in tabbars" :key="item.key">
          </el-tab-pane>
        </el-tabs>
        <el-form :model="params" ref="formRef" label-width="70px"
          :class="$store.state.isMobile ? 'el-form-m' : 'el-form-p'"
          :label-position="$store.state.isMobile ? 'top' : 'left'">
          <el-form-item v-if="params.tab === 'channel' || params.tab === 'source'" label="时间">
            <el-button-group v-show="!$store.state.isMobile">
              <el-button :type="params.scope === 'allMix' ? 'primary' : ''"
                @click="setScope('allMix')">
                全部
              </el-button>
              <el-button :type="params.scope === 'todayMix' ? 'primary' : ''"
                @click="setScope('todayMix')">
                今日</el-button>
              <el-button :type="params.scope === 'yestodayMix' ? 'primary' : ''"
                @click="setScope('yestodayMix')">昨日</el-button>
              <el-button :type="params.scope === 'last7dayMix' ? 'primary' : ''"
                @click="setScope('last7dayMix')">近7日</el-button>
              <el-button :type="params.scope === 'last30dayMix' ? 'primary' : ''"
                @click="setScope('last30dayMix')">近30日</el-button>
              <el-button :type="params.scope === 'monthMix' ? 'primary' : ''"
                @click="setScope('monthMix')">
                本月</el-button>
              <el-button :type="params.scope === 'yearMix' ? 'primary' : ''"
                @click="setScope('yearMix')">本年
              </el-button>
            </el-button-group>
            <template v-if="!$store.state.isMobile">
              <el-date-picker v-model="params.mix_time" value-format="YYYY-MM-DD" :editable="false"
                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                @change="switchMixTime" />
            </template>
            <template v-else>
              <el-date-picker style="width: 100%;margin-bottom: 10px;"
                v-model="params.mix_time_start" type="date" placeholder="开始日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" :editable="false" @change="switchMixTime" clearable />
              <el-date-picker style="width: 100%" v-model="params.mix_time_end" type="date"
                placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false"
                @change="switchMixTime" clearable />
            </template>
          </el-form-item>
          <el-form-item v-if="params.tab === 'channel' || params.tab === 'source'" label="下单时间">
            <el-button-group v-show="!$store.state.isMobile">
              <el-button :type="params.scope === 'all' ? 'primary' : ''" @click="setScope('all')">
                全部
              </el-button>
              <el-button :type="params.scope === 'today' ? 'primary' : ''"
                @click="setScope('today')">
                今日</el-button>
              <el-button :type="params.scope === 'yestoday' ? 'primary' : ''"
                @click="setScope('yestoday')">昨日</el-button>
              <el-button :type="params.scope === 'last7day' ? 'primary' : ''"
                @click="setScope('last7day')">近7日</el-button>
              <el-button :type="params.scope === 'last30day' ? 'primary' : ''"
                @click="setScope('last30day')">近30日</el-button>
              <el-button :type="params.scope === 'month' ? 'primary' : ''"
                @click="setScope('month')">
                本月</el-button>
              <el-button :type="params.scope === 'year' ? 'primary' : ''"
                @click="setScope('year')">本年
              </el-button>
            </el-button-group>
            <template v-if="!$store.state.isMobile">
              <el-date-picker v-model="params.order_time" value-format="YYYY-MM-DD"
                :editable="false" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" @change="switchTime" />
            </template>
            <template v-else>
              <el-date-picker style="width: 100%;margin-bottom: 10px;"
                v-model="params.order_time_start" type="date" placeholder="开始日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" :editable="false" @change="switchTime" clearable />
              <el-date-picker style="width: 100%" v-model="params.order_time_end" type="date"
                placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                @change="switchTime" :editable="false" clearable />
            </template>
          </el-form-item>
          <el-form-item v-if="params.tab === 'area'" label="派单时间">
            <el-button-group v-show="!$store.state.isMobile">
              <el-button :type="params.scope === 'all' ? 'primary' : ''" @click="setScope('all')">全部
              </el-button>
              <el-button :type="params.scope === 'today' ? 'primary' : ''"
                @click="setScope('today')">
                今日</el-button>
              <el-button :type="params.scope === 'yestoday' ? 'primary' : ''"
                @click="setScope('yestoday')">昨日</el-button>
              <el-button :type="params.scope === 'last7day' ? 'primary' : ''"
                @click="setScope('last7day')">近7日</el-button>
              <el-button :type="params.scope === 'last30day' ? 'primary' : ''"
                @click="setScope('last30day')">近30日</el-button>
              <el-button :type="params.scope === 'month' ? 'primary' : ''"
                @click="setScope('month')">
                本月</el-button>
              <el-button :type="params.scope === 'year' ? 'primary' : ''"
                @click="setScope('year')">本年
              </el-button>
            </el-button-group>
            <template v-if="!$store.state.isMobile">
              <el-date-picker v-model="params.arrange_time" value-format="YYYY-MM-DD"
                :editable="false" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" @change="switchTime" />
            </template>
            <template v-else>
              <el-date-picker style="width: 100%;margin-bottom: 10px;"
                v-model="params.arrange_time_start" type="date" placeholder="开始日期"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false" clearable
                @change="switchMixTime" />
              <el-date-picker style="width: 100%" v-model="params.arrange_time_end" type="date"
                placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false"
                clearable @change="switchMixTime" />
            </template>
          </el-form-item>
          <el-form-item v-if="params.tab === 'deal'" label="时间">
            <el-button-group v-show="!$store.state.isMobile">
              <el-button :type="params.scope === 'all' ? 'primary' : ''" @click="setScope('all')">全部
              </el-button>
              <el-button :type="params.scope === 'today' ? 'primary' : ''"
                @click="setScope('today')">
                今日</el-button>
              <el-button :type="params.scope === 'yestoday' ? 'primary' : ''"
                @click="setScope('yestoday')">昨日</el-button>
              <el-button :type="params.scope === 'last7day' ? 'primary' : ''"
                @click="setScope('last7day')">近7日</el-button>
              <el-button :type="params.scope === 'last30day' ? 'primary' : ''"
                @click="setScope('last30day')">近30日</el-button>
              <el-button :type="params.scope === 'month' ? 'primary' : ''"
                @click="setScope('month')">
                本月</el-button>
              <el-button :type="params.scope === 'year' ? 'primary' : ''"
                @click="setScope('year')">本年
              </el-button>
            </el-button-group>
            <template v-if="!$store.state.isMobile">
              <el-date-picker v-model="params.deal_time" value-format="YYYY-MM-DD" :editable="false"
                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                @change="switchTime" />
            </template>
            <template v-else>
              <el-date-picker style="width: 100%;margin-bottom: 10px;"
                v-model="params.deal_time_start" type="date" placeholder="开始日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" :editable="false" clearable @change="switchMixTime" />
              <el-date-picker style="width: 100%" v-model="params.deal_time_end" type="date"
                placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false"
                clearable @change="switchMixTime" />
            </template>
          </el-form-item>
          <el-form-item v-if="params.tab === 'state'" label="年报表">
            <el-date-picker style="width: 100%;margin-bottom: 10px;"
              v-model="params.year_time_start" type="year" placeholder="开始年份" format="YYYY"
              value-format="YYYY-MM-DD" :editable="false" @change="hanldeStateYearChange" />
            <el-date-picker style="width: 100%" v-model="params.year_time_end" type="year"
              placeholder="结束年份" format="YYYY" value-format="YYYY" :editable="false"
              @change="hanldeStateYearChange" />
          </el-form-item>
          <el-form-item v-if="params.tab === 'state'" label="月报表">
            <el-date-picker style="width: 100%;margin-bottom: 10px;"
              v-model="params.month_time_start" type="month" placeholder="开始月份" format="YYYY-MM"
              value-format="YYYY-MM-DD" :editable="false" @change="hanldeStateMonthChange" />
            <el-date-picker style="width: 100%" v-model="params.month_time_end" type="month"
              placeholder="结束月份" format="YYYY-MM" value-format="YYYY-MM-DD" :editable="false"
              @change="hanldeStateMonthChange" />
          </el-form-item>
          <el-form-item v-if="params.tab === 'state'" label="周报表">
            <el-date-picker style="width: 100%;margin-bottom: 10px;"
              v-model="params.week_time_start" type="week" placeholder="开始日期"
              format="YYYY-[第] w [周]" value-format="YYYY-MM-DD" :editable="false"
              @change="hanldeStateWeekChange" />
            <el-date-picker style="width: 100%" v-model="params.week_time_end" type="week"
              placeholder="结束日期" format="YYYY-[第] w [周]" value-format="YYYY-MM-DD" :editable="false"
              @change="hanldeStateWeekChange" />
          </el-form-item>
          <el-form-item v-if="params.tab === 'state'" label="日报表">
            <el-date-picker style="width: 100%;margin-bottom: 10px;" v-model="params.time_start"
              type="date" placeholder="开始日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :editable="false" @change="hanldeStateTimeChange" />
            <el-date-picker style="width: 100%" v-model="params.time_end" type="date"
              placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false"
              @change="hanldeStateTimeChange" />
          </el-form-item>
          <el-form-item v-if="params.tab === 'channel' || params.tab === 'source'" label="渠道">
            <el-select v-model="params.channel_id" placeholder="选择或搜索渠道" clearable multiple
              :collapse-tags="$store.state.isMobile" :max-collapse-tags="3" collapse-tags-tooltip>
              <el-option label='全选' :value='0' @click='selectAllChannel'></el-option>
              <el-option :value="item.id" :label="item.name" v-for="item in channel" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="params.tab === 'source'" label="来源">
            <el-select v-model="params.source_id" placeholder="选择或搜索来源" clearable multiple
              @change="sourceChange">
              <el-option-group v-for="group in source" :key="group.label" :label="group.label">
                <el-option :value="item.id" :label="item.name" v-for="item in group.options"
                  :key="item.id"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="(params.tab === 'area' || params.tab === 'deal') && $store.state.adminInfo.branch_id === '1'"
            label="所在省">
            <el-select v-model="params.province_id" filterable multiple
              :collapse-tags="$store.state.isMobile" :max-collapse-tags="3" collapse-tags-tooltip
              placeholder="选择或搜索省" clearable @change="areaChange">
              <el-option :value="item.id" :label="item.areaname" v-for="item in province"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="(params.tab === 'area' || params.tab === 'deal') && $store.state.adminInfo.branch_id === '1'"
            label="所在市">
            <el-select v-model="params.city_id" placeholder="选择或搜索市" filterable multiple
              :collapse-tags="$store.state.isMobile" :max-collapse-tags="3" collapse-tags-tooltip
              clearable @change="areaChange">
              <el-option-group v-for="group in city" :key="group.label" :label="group.label">
                <el-option :value="item.id" :label="item.areaname" v-for="item in group.options"
                  :key="item.id"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item v-if="(params.tab === 'deal') && $store.state.adminInfo.branch_id === '1'"
            label="一级区域">
            <el-select v-model="params.region_id" filterable multiple placeholder="选择一级区域"
              :collapse-tags="$store.state.isMobile" :max-collapse-tags="3" @change="regionChange"
              collapse-tags-tooltip clearable>
              <el-option label='全选' :value='0' @click='selectAllRegion'></el-option>
              <el-option :value="item.id" :label="item.name" v-for="item in regionList"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="params.tab === 'deal'" label="接单公司">
            <el-select v-model="params.receive_company" placeholder="选择或搜索公司" clearable multiple
              collapse-tags :max-collapse-tags="3" collapse-tags-tooltip filterable
              @change="branchChange">
              <el-option label='全选' :value='0' @click='selectAllBranch'></el-option>
              <el-option :value="item.id" :label="item.name" v-for="item in branch" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="(params.tab === 'deal') && $store.state.adminInfo.branch_id === '1'"
            label="公司状态">
            <el-select v-model="params.branch_status" filterable multiple placeholder="选择公司状态"
              :collapse-tags="$store.state.isMobile" :max-collapse-tags="3" @change="statusChange"
              collapse-tags-tooltip clearable>
              <!-- <el-option label='全选' :value='0' @click='selectAllRegion'></el-option> -->
              <el-option :value="item.key" :label="item.value" v-for="item in statusList"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="params.tab !== 'other'">
            <el-button @click="onReset">重置</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">生成报表</el-button>
          </el-form-item>
        </el-form>
        <!-- 常用查询 -->
        <el-row :gutter="20" class="search-tag" v-if="params.tab === 'other'">
          <el-col :span="24" :offset="0">
            <el-tag :type="tagId === tag.id ? '' : 'info'" v-for="tag in dataSearchList"
              @click="handleSearch(tag)" :key="tag.id" closable @close="searchDelete(tag.id)">
              {{ tag.name }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20"
          v-if="dataChannelList.length > 0 || dataSourceList.length > 0 || dataAreaList.length > 0 || dataDealList.length > 0 || dataStateList.length > 0">
          <el-col :span="24" :offset="0" style="text-align: right; margin-bottom: 15px">
            <el-button v-permission="129"
              v-if="params.tab == 'channel' || params.tab == 'source' || params.tab == 'area' || params.tab == 'deal'"
              type="primary" @click="searchAdd" :loading="loading">添加到常用查询</el-button>
            <el-button v-permission="120" type="danger" @click="handExport"
              :loading="loading">导出</el-button>
          </el-col>
        </el-row>

        <div class="tableData" style="padding-bottom: 15px" v-loading="loading"
          element-loading-text="数据加载中......">
          <!-- 渠道报表 -->
          <el-table id="channelTable" v-if="dataChannelList.length > 0" :data="dataChannelList"
            border stripe :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }">
            <el-table-column prop="channel_name" label="渠道" min-width="90" />
            <el-table-column prop="order_number" label="下单数" />
            <el-table-column prop="arrange_number" label="派单数" />
            <el-table-column prop="docking_number" label="签单数" />
            <el-table-column min-width="100" label="派单率">
              <template #default="scope">
                {{ scope.row.arrange_per }}%
              </template>
            </el-table-column>
            <el-table-column min-width="100" label="签单率">
              <template #default="scope">
                {{ scope.row.docking_per }}%
              </template>
            </el-table-column>
            <el-table-column prop="size" label="平均签单面积" />
          </el-table>
          <!-- 来源报表 -->
          <el-table id="sourceTable" v-if="dataSourceList.length > 0" :data="dataSourceList"
            style="width: 100%" :span-method="objectSpanMethod" border
            :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }">
            <el-table-column :prop="item.prop" :label="item.label"
              v-for="(item, index) in SourceTableHeader" :key="index"></el-table-column>
          </el-table>
          <!-- 区域报表 -->
          <el-table id="areaTable" v-if="dataAreaList.length > 0" :data="dataAreaList"
            style="width: 100%" :span-method="objectSpanMethod" border
            :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" show-summary>
            <el-table-column :prop="item.prop" :label="item.label"
              v-for="(item, index) in AreaTableHeader" :key="index"></el-table-column>
          </el-table>
          <!-- 签单报表,动态加载数据需要使用row-key -->
          <el-table id="dealTable" v-if="dataDealList.length > 0" :data="dataDealList" border stripe
            :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" ref="dealTableRef"
            row-key="id" @expand-change="handExpand">
            <!--  width="1" -->
            <el-table-column type="expand"
              v-if="$store.state.adminInfo.role_id==1 || $store.state.adminInfo.role_id==19">
              <template #default="props">
                <!-- <div style="padding: 10px 20px;">
                <el-descriptions :column="1" title="签单详情">
                  <el-descriptions-item v-for="item in props.row.docking_detail"
                    :key="item.channel_id"
                    :label="item.channel_name">{{ item.docking_number }}</el-descriptions-item>
                </el-descriptions>
              </div> -->
                <div style="padding:10px 20px">
                  <el-divider>
                    <h4>签单面积信息</h4>
                  </el-divider>
                  <el-table :data="props.row.size_detail" v-loading="props.row.showDetail" stripe
                    border>
                    <el-table-column label="总面积" prop="sum_size"></el-table-column>
                    <el-table-column label="最大面积" prop="max_size"></el-table-column>
                    <el-table-column label="最小面积" prop="min_size"></el-table-column>
                    <el-table-column label="平均面积" prop="avg_size"></el-table-column>
                  </el-table>
                  <el-divider>
                    <h4>渠道信息</h4>
                  </el-divider>
                  <el-table :data="props.row.docking_detail" v-loading="props.row.showDetail" stripe
                    border row-key="id">
                    <el-table-column label="渠道" prop="channel_name"></el-table-column>
                    <el-table-column label="派单数" prop="arrange_number"></el-table-column>
                    <el-table-column label="签单数" prop="docking_number"></el-table-column>
                    <el-table-column label="签单率">
                      <template #default="scope">
                        {{ scope.row.docking_per }}%
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="" width="60" align="center">
            <template #default="scope">
              <el-icon v-if="!scope.row.showDetail">
                <ArrowRight @click="handleDetails(scope.row)" />
              </el-icon>
              <el-icon v-else>
                <ArrowDown @click="handleDetails(scope.row)" />
              </el-icon>
            </template>
          </el-table-column> -->
            <el-table-column prop="branch_name" label="公司" min-width="120" />
            <el-table-column prop="arrange_number"
              :sortable="$store.state.adminInfo.branch_id==1 ? true : false" label="派单数"
              min-width="100" />
            <el-table-column prop="docking_number"
              :sortable="$store.state.adminInfo.branch_id==1 ? true : false" label="签单数"
              min-width="100" />
            <el-table-column prop="per"
              :sortable="$store.state.adminInfo.branch_id==1 ? true : false" label="签单率"
              min-width="100">
              <template #default="scope">
                {{ scope.row.per }}%
              </template>
            </el-table-column>
            <el-table-column prop="feedback_per"
              :sortable="$store.state.adminInfo.branch_id==1 ? true : false" label="反馈率"
              min-width="100">
              <template #default="scope">
                {{ scope.row.feedback_per }}%
              </template>
            </el-table-column>
          </el-table>
          <!-- 虚拟表格 -->
          <!-- <div style="height: 400px">
          <el-auto-resizer>
            <template #default="{ height, width }">
              <el-table-v2 v-if="dataDealList.length > 0" :columns="columns" :data="dataDealList"
                :width="width" :height="height" border stripe fixed
                :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }" />
            </template>
          </el-auto-resizer>
        </div> -->
          <!-- 统计报表 -->
          <el-table id="stateTable" v-if="dataStateList.length > 0" :data="dataStateList" border
            stripe :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }"
            row-key="project_name" @expand-change="handStateExpand">
            <el-table-column type="expand">
              <template #default="props">
                <div style="padding:10px 20px">
                  <el-divider>
                    <h4>渠道信息</h4>
                  </el-divider>
                  <el-table :data="props.row.docking_detail" v-loading="props.row.showDetail" stripe
                    border row-key="id">
                    <el-table-column label="渠道" prop="channel_name"></el-table-column>
                    <el-table-column label="下单数" prop="order_number"></el-table-column>
                    <el-table-column label="派单数" prop="arrange_number"></el-table-column>
                    <el-table-column label="派单率">
                      <template #default="scope">
                        {{ scope.row.arrange_per }}%
                      </template>
                    </el-table-column>
                    <el-table-column label="签单数" prop="docking_number"></el-table-column>
                    <el-table-column label="签单率">
                      <template #default="scope">
                        {{ scope.row.docking_per }}%
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="project_name" min-width="100" label="项目" />
            <el-table-column prop="order_number" min-width="100" label="下单数" />
            <el-table-column prop="arrange_number" min-width="100" label="派单数" />
            <el-table-column prop="arrange_per" min-width="100" label="派单率" />
            <el-table-column prop="docking_number" min-width="100" label="签单数" />
            <el-table-column prop="docking_per" min-width="100" label="签单率" />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed, watch } from 'vue'
import moment from 'moment'
import order from '@/api/order'
import { closeElLoading, createUniqueString, elLoading, showModal, showPrompt, toast, time_init } from '@/utils/utils'
import search from '@/api/search'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { useStore } from 'vuex'

const store = useStore()

// 当天
const currentDay = moment().format('YYYY-MM-DD')
// 昨天
const lastDay = moment().add(-1, 'd').format('YYYY-MM-DD')
// 近7天
const week7Day = moment().add(-6, 'd').format('YYYY-MM-DD')
// 近30日
const week30Day = moment().add(-29, 'd').format('YYYY-MM-DD')
// 当月1号
const monthStartDay = moment().startOf('month').format('YYYY-MM-DD')
// 当月最后一天
const monthEndDay = moment().endOf('month').format('YYYY-MM-DD')
// 当年第一天
const yearStartDay = moment().startOf('year').format('YYYY-MM-DD')

const loading = ref(false)
const formRef = ref(null)
const params = reactive({
  tab: 'channel',
  order_time: '',
  order_time_start: '',
  order_time_end: '',
  mix_time: '',
  mix_time_start: '',
  mix_time_end: '',
  arrange_time: '',
  arrange_time_start: '',
  arrange_time_end: '',
  deal_time: '',
  deal_time_start: '',
  deal_time_end: '',
  year_time_start: '',
  year_time_end: '',
  month_time_start: '',
  month_time_end: '',
  week_time_start: '',
  week_time_end: '',
  time_start: '',
  time_end: '',
  channel_id: '',
  source_id: '',
  province_id: '',
  city_id: '',
  region_id: '',
  receive_company: '',
  branch_status: '',
  scope: 'all',
})

const dealPage = reactive({
  page: 1,
  pageSize: 20,
  countPage: 1,
})

if (store.state.adminInfo.branch_id != 1) {
  params.tab = 'deal'
}
// tabs
const tabbars = [
  {
    key: 'channel',
    name: '渠道',
  },
  {
    key: 'source',
    name: '来源',
  },
  {
    key: 'area',
    name: '区域',
  },
  {
    key: 'deal',
    name: '反馈签单',
  },
  {
    key: 'state',
    name: '报表',
  },
  {
    key: 'other',
    name: '常用查询',
  },
]

// 渠道全选
const selectAllChannel = (e) => {
  let channel_ids = channel.value.map((item) => item.id)
  if (params.channel_id.includes(0) && params.channel_id.length - 1 < channel.value.length) {
    params.channel_id = channel_ids
  } else {
    params.channel_id = ''
  }
}

const areaChange = (val) => {
  params.region_id = ''
}
const regionChange = (val) => {
  params.province_id = ''
  params.city_id = ''
  params.receive_company = ''
  dealPage.page = 1
  dataDealList.value = []

  if (val.length > 0 && !val.includes(0)) {
    branch.value = branchList.value.filter((o) => params.region_id.includes(o.region_id))
  } else {
    branch.value = branchList.value
  }
}

const statusChange = (val) => {
  params.receive_company = ''
  dataDealList.value = []
  dealPage.page = 1
}
const branchChange = (val) => {
  params.branch_status = ''
  dataDealList.value = []
  dealPage.page = 1
}
// 一级区域全选
const selectAllRegion = (e) => {
  let region_ids = regionList.value.map((item) => item.id)
  if (params.region_id.includes(0) && params.region_id.length - 1 < regionList.value.length) {
    params.region_id = region_ids
  } else {
    params.region_id = ''
  }
}

// 公司状态
const statusList = ref([
  { key: 1, value: '在营' },
  { key: 2, value: '关闭' },
  { key: 3, value: '门店' },
])

// 公司全选
const selectAllBranch = (e) => {
  let companys = branch.value.map((item) => item.id)
  console.log(companys)
  if (params.receive_company.includes(0) && params.receive_company.length - 1 < branch.value.length) {
    params.receive_company = companys
  } else {
    params.receive_company = ''
  }
}

// 渠道报表数据
const dataChannelList = ref([])
const dataSourceList = ref([])
const dataAreaList = ref([])
const dataDealList = ref([])
const dataStateList = ref([])
const dataSearchList = ref([])
// const columns = ref([
//   { key: 'branch_name', title: '公司', dataKey: 'branch_name', width: 150 },
//   { key: 'arrange_number', title: '派单数', dataKey: 'arrange_number', width: 150 },
//   { key: 'docking_number', title: '签单数', dataKey: 'docking_number', width: 150 },
//   { key: 'per', title: '签单率', dataKey: 'per', width: 150 },
// ])
const tagId = ref(0)

const pos = ref(0)
const spanArr = ref([])
const SourceTableHeader = ref([
  {
    prop: 'channel_name',
    label: '渠道',
  },
  {
    prop: 'source_name',
    label: '来源',
  },
  {
    prop: 'order_number',
    label: '下单数',
  },
  {
    prop: 'arrange_number',
    label: '派单数',
  },
  {
    prop: 'docking_number',
    label: '签单数',
  },
  {
    prop: 'arrange_per',
    label: '派单率',
  },
  {
    prop: 'docking_per',
    label: '签单率',
  },
])
const AreaTableHeader = ref([
  {
    prop: 'province_name',
    label: '省份',
  },
  {
    prop: 'order_number',
    label: '下单数',
  },
  {
    prop: 'arrange_number',
    label: '派单数',
  },
  {
    prop: 'docking_number',
    label: '签单数',
  },
])

/**
 * 合并省名相同的单元格，[4, 0, 0, 0, 3, 0, 0, 2, 0]，
 * 0表示删除该单元格，1为默认不合并，大于1则为需要合并的行数
 * 如有4个广东省的单元格，第一个单元格合并4行，再删除3个同名的单元格
 */
const getSpanArr = (data) => {
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      spanArr.value.push(1) //第一行的第一个单元格初始化不合并
      pos.value = 0
    } else {
      if (params.tab === 'area') {
        if (data[i].province_name === data[i - 1].province_name) {
          spanArr.value[pos.value] += 1
          spanArr.value.push(0)
        } else {
          spanArr.value.push(1)
          pos.value = i
        }
      } else {
        if (data[i].channel_name === data[i - 1].channel_name) {
          spanArr.value[pos.value] += 1
          spanArr.value.push(0)
        } else {
          spanArr.value.push(1)
          pos.value = i
        }
      }
    }
  }
}
watch(dataSourceList, (newval) => {
  pos.value = 0
  spanArr.value = []
  getSpanArr(dataSourceList.value)
})
watch(dataAreaList, (newval) => {
  pos.value = 0
  spanArr.value = []
  getSpanArr(dataAreaList.value)
})
// console.log(spanArr)
/**
 * 单行或对行合并参考：https://blog.csdn.net/weixin_48201324/article/details/125192153
 */
const objectSpanMethod = ({ rowIndex, columnIndex }) => {
  //只对第一列的数据合并
  if (columnIndex === 0) {
    const _row = spanArr.value[rowIndex]
    // 合并数为0则删除该单元格，为1则不进行合并，如广东省的所有行[4,1],[0,0],[0,0],[0,0]
    const _col = _row > 0 ? 1 : 0
    return {
      rowspan: _row,
      colspan: _col,
    }
  }
}

// tabs切换
const handleTabChange = (val) => {
  params.order_time = ''
  params.order_time_start = ''
  params.order_time_end = ''
  params.mix_time = ''
  params.mix_time_start = ''
  params.mix_time_end = ''
  params.arrange_time = ''
  params.arrange_time_start = ''
  params.arrange_time_end = ''
  params.deal_time = ''
  params.deal_time_start = ''
  params.deal_time_end = ''
  params.year_time_start = ''
  params.year_time_end = ''
  params.month_time_start = ''
  params.month_time_end = ''
  params.week_time_start = ''
  params.week_time_end = ''
  params.time_start = ''
  params.time_end = ''
  params.channel_id = ''
  params.province_id = ''
  params.city_id = ''
  params.region_id = ''
  params.receive_company = ''
  params.branch_status = ''
  params.scope = 'all'
  dataChannelList.value = []
  dataSourceList.value = []
  dataAreaList.value = []
  dataDealList.value = []
  dataStateList.value = []
  pos.value = 0
  tagId.value = 0
  dealPage.page = 1
  spanArr.value = []
  if (val === 'other') {
    getSearch()
  }
}

const hanldeStateYearChange = (val) => {
  params.month_time_start = ''
  params.month_time_end = ''
  params.week_time_start = ''
  params.week_time_end = ''
  params.time_start = ''
  params.time_end = ''
  dataStateList.value = []
}
const hanldeStateMonthChange = (val) => {
  params.year_time_start = ''
  params.year_time_end = ''
  params.week_time_start = ''
  params.week_time_end = ''
  params.time_start = ''
  params.time_end = ''
  dataStateList.value = []
}
const hanldeStateWeekChange = (val) => {
  params.year_time_start = ''
  params.year_time_end = ''
  params.month_time_start = ''
  params.month_time_end = ''
  params.time_start = ''
  params.time_end = ''
  dataStateList.value = []
}
const hanldeStateTimeChange = (val) => {
  params.year_time_start = ''
  params.year_time_end = ''
  params.month_time_start = ''
  params.month_time_end = ''
  params.week_time_start = ''
  params.week_time_end = ''
  dataStateList.value = []
}
// 来源选择
const sourceChange = (val) => {
  dataSourceList.value = []
}
// 时间按钮切换
const setScope = (val) => {
  switch (val) {
    case 'all':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = ''
      } else if (params.tab === 'area') {
        params.arrange_time = ''
      } else if (params.tab === 'deal') {
        params.deal_time = ''
      }
      params.mix_time = params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'today':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = [currentDay, currentDay]
      } else if (params.tab === 'area') {
        params.arrange_time = [currentDay, currentDay]
      } else if (params.tab === 'deal') {
        params.deal_time = [currentDay, currentDay]
      }
      params.mix_time = ''
      break
    case 'yestoday':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = [lastDay, lastDay]
      } else if (params.tab === 'area') {
        params.arrange_time = [lastDay, lastDay]
      } else if (params.tab === 'deal') {
        params.deal_time = [lastDay, lastDay]
      }
      params.mix_time = ''
      break
    case 'last7day':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = [week7Day, currentDay]
      } else if (params.tab === 'area') {
        params.arrange_time = [week7Day, currentDay]
      } else if (params.tab === 'deal') {
        params.deal_time = [week7Day, currentDay]
      }
      params.mix_time = ''
      break
    case 'last30day':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = [week30Day, currentDay]
      } else if (params.tab === 'area') {
        params.arrange_time = [week30Day, currentDay]
      } else if (params.tab === 'deal') {
        params.deal_time = [week30Day, currentDay]
      }
      params.mix_time = ''
      break
    case 'month':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = [monthStartDay, currentDay]
      } else if (params.tab === 'area') {
        params.arrange_time = [monthStartDay, currentDay]
      } else if (params.tab === 'deal') {
        params.deal_time = [monthStartDay, currentDay]
      }
      params.mix_time = ''
      break
    case 'year':
      if (params.tab === 'channel' || params.tab === 'source') {
        params.order_time = [yearStartDay, currentDay]
      } else if (params.tab === 'area') {
        params.arrange_time = [yearStartDay, currentDay]
      } else if (params.tab === 'deal') {
        params.deal_time = [yearStartDay, currentDay]
      }
      params.mix_time = ''
      break
    case 'allMix':
      params.mix_time = params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'todayMix':
      params.mix_time = [currentDay, currentDay]
      params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'yestodayMix':
      params.mix_time = [lastDay, lastDay]
      params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'last7dayMix':
      params.mix_time = [week7Day, currentDay]
      params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'last30dayMix':
      params.mix_time = [week30Day, currentDay]
      params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'monthMix':
      params.mix_time = [monthStartDay, currentDay]
      params.order_time = params.arrange_time = params.deal_time = ''
      break
    case 'yearMix':
      params.mix_time = [yearStartDay, currentDay]
      params.order_time = params.arrange_time = params.deal_time = ''
      break
    default:
      params.mix_time = params.order_time = params.arrange_time = params.deal_time = ''
      break
  }
  params.scope = val
  dataChannelList.value = []
  dataSourceList.value = []
  dataAreaList.value = []
  dataDealList.value = []
  dataStateList.value = []
  // getBarData()
}

// 时间选择器切换
const switchTime = (val) => {
  if (val) {
    params.scope = ''
  } else {
    params.scope = 'all'
  }
  params.mix_time = params.mix_time_start = params.mix_time_end = ''
  dataChannelList.value = []
  dataSourceList.value = []
  dataAreaList.value = []
  dataDealList.value = []
  dataStateList.value = []
  dealPage.page = 1
  // getBarData()
}

const switchMixTime = (val) => {
  if (val) {
    params.scope = ''
  } else {
    params.scope = 'allMix'
  }
  params.order_time = params.order_time_start = params.order_time_end = ''
  dealPage.page = 1
  dataChannelList.value = []
  dataSourceList.value = []
  dataAreaList.value = []
  dataDealList.value = []
  dataStateList.value = []
  console.log(params.deal_time_start)
  // getBarData()
}

// 获取常用搜索数据
const getSearch = () => {
  search.getList().then((res) => {
    if (res.code > 0) {
      dataSearchList.value = res.result
    } else {
      toast('查询数据获取失败', 'error')
    }
  })
}
// 新增常用搜索
const searchAdd = () => {
  if (params.tab === 'area' && params.city_id) {
    toast('常用查询暂不支持城市级别查询', 'warning')
    return
  }
  showPrompt('输入查询名称')
    .then((name) => {
      loading.value = true
      search
        .create({ name: name.value, params: params })
        .then((res) => {
          if (res.code > 0) {
            toast('数据添加成功')
          } else {
            toast(res.message || '数据添加失败', 'error')
          }
        })
        .finally(() => {
          loading.value = false
        })
    })
    .catch((error) => {})
}
// 删除常用搜索
const searchDelete = (id) => {
  // 判断是否有删除权限 权限ID130
  showModal('确认要删除该数据吗？')
    .then((res) => {
      search.delete(id).then((res) => {
        if (res.code > 0) {
          toast('数据删除成功')
          dataChannelList.value = []
          dataSourceList.value = []
          dataAreaList.value = []
          dataDealList.value = []
          dataStateList.value = []
          pos.value = 0
          spanArr.value = []
          getSearch()
        } else {
          toast(res.message || '数据添加失败', 'error')
        }
      })
    })
    .catch((err) => {})
}
// 常用查询点击
const handleSearch = (item) => {
  tagId.value = item.id
  dataChannelList.value = []
  dataSourceList.value = []
  dataAreaList.value = []
  dataDealList.value = []
  dataStateList.value = []
  pos.value = 0
  spanArr.value = []
  getData(item.params)
}
// 生成报表
const onSubmit = () => {
  if (params.tab === 'source' && !params.channel_id) {
    toast('请选择渠道', 'error')
    return
  }
  if (params.tab === 'state') {
    //if (params['year_time_end']) params['year_time_end'] = params['year_time_end'] + '-12-31'
    if (params['year_time_end']) params['year_time_end'] = moment(params['year_time_end']).endOf('year').format('YYYY-MM-DD HH:mm:ss')
    if (params['year_time_end'] < params['year_time_start']) {
      toast('查询条件错误', 'error')
      return
    }
    if (params['month_time_end']) params['month_time_end'] = moment(params['month_time_end']).endOf('month').format('YYYY-MM-DD HH:mm:ss')
    if (params['week_time_end']) params['week_time_end'] = moment(params['week_time_end']).add(6, 'd').format('YYYY-MM-DD')
    if (params['time_end']) params['time_end'] = moment(params['time_end']).endOf('day').format('YYYY-MM-DD HH:mm:ss')
  }
  getData(params)
}

const exports = (filename) => {
  return new Promise((resolve, reject) => {
    elLoading('数据导出中...')
    /* 从表生成工作簿对象 */
    let dom
    if (dataChannelList.value.length > 0) {
      dom = document.querySelector('#channelTable')
    } else if (dataSourceList.value.length > 0) {
      dom = document.querySelector('#sourceTable')
    } else if (dataAreaList.value.length > 0) {
      dom = document.querySelector('#areaTable')
    } else if (dataDealList.value.length > 0) {
      dom = document.querySelector('#dealTable')
    } else if (dataStateList.value.length > 0) {
      dom = document.querySelector('#stateTable')
    }
    var wb = XLSX.utils.table_to_book(dom)
    /* 获取二进制字符串作为输出 */
    var wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array',
    })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        //设置导出文件名称
        filename
      )
    } catch (e) {
      if (typeof console !== 'undefined') toast(e.wbout, 'error')
    }
    resolve()
    return wbout
  })
}

// 导出报表
const handExport = () => {
  let filename = time_init(true) + '-' + createUniqueString() + '.xlsx'
  exports(filename).then((res) => {
    closeElLoading()
  })
}

// 签单统计查看渠道详情
const handExpand = (row, expandedRows) => {
  if (row.docking_detail.length == 0) {
    params.branch_id = row.id ? row.id : 0
    params.branch_id = params.branch_id ? params.branch_id : params.receive_company
    row.showDetail = true
    order
      .getChannelDetail(params)
      .then((res) => {
        if (res.code > 0) {
          let admin_id = store.state.adminInfo.id
          let channel = res.result.channel
          let size = res.result.size
          let sum_size = 0
          let max_size = 0
          let min_size = 0
          let avg_size = 0
          if (size.length > 0) {
            sum_size = size.reduce((a, b) => a + b)
            max_size = size.reduce((a, b) => (a > b ? a : b)) // Math.max(...array)
            min_size = size.reduce((a, b) => (a < b ? a : b))
            avg_size = (sum_size / size.length).toFixed(1)
          }
          row.size_detail = [
            {
              sum_size: sum_size,
              max_size: max_size,
              min_size: min_size,
              avg_size: avg_size,
            },
          ]
          if (admin_id == 847) {
            // 百度+二类电商
            row.docking_detail = channel.filter((item) => item.id == 4 || item.id == 172 || item.id == 117 || item.id == 167 || item.id == 108 || item.id == 152 || item.id == 134 || item.id == 119)
          } else if (admin_id == 823) {
            // 头条+二类电商
            row.docking_detail = channel.filter((item) => item.id == 3 || item.id == 172 || item.id == 117 || item.id == 167 || item.id == 108 || item.id == 152 || item.id == 134 || item.id == 119)
          } else {
            row.docking_detail = channel.filter((item) => item.arrange_number > 0 || item.docking_number > 0)
          }
        } else {
          let msg = res.message || '数据请求失败'
          toast(msg, 'error')
        }
      })
      .finally(() => {
        row.showDetail = false
      })
  }
}
const dealTableRef = ref(null)
const handleDetails = (row) => {
  let branch_id = row.id ? row.id : 0
  //row.showDetail = !row.showDetail
  dealTableRef.value.toggleRowExpansion(row)
  order
    .getChannelDetail(params)
    .then((res) => {
      if (res.code > 0) {
        row.docking_detail = res.result
      } else {
        let msg = res.message || '数据请求失败'
        toast(msg, 'error')
      }
    })
    .finally(() => {
      //row.showDetail = false
    })

  return
}

// 月度报表查看渠道详情
const handStateExpand = (row, expandedRows) => {
  if (!row.docking_detail) {
    row.showDetail = true
    let project_name = row.project_name
    let start_time, end_time
    if (params['year_time_start']) {
      if (project_name == '合计') {
        start_time = params['year_time_start']
        end_time = params['year_time_end']
      } else {
        start_time = moment(project_name).startOf('year').format('YYYY-MM-DD HH:mm:ss')
        end_time = moment(project_name).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
    }
    if (params['month_time_start']) {
      if (project_name == '合计') {
        start_time = params['month_time_start']
        end_time = params['month_time_end']
      } else {
        start_time = moment(project_name).startOf('month').format('YYYY-MM-DD HH:mm:ss')
        end_time = moment(project_name).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      }
    }
    if (params['week_time_start']) {
      if (project_name == '合计') {
        start_time = moment(params['week_time_start']).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        end_time = moment(params['week_time_end']).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      } else {
        start_time = moment(project_name).startOf('week').format('YYYY-MM-DD HH:mm:ss')
        end_time = moment(project_name).endOf('week').format('YYYY-MM-DD HH:mm:ss')
      }
    }
    if (params['time_start']) {
      if (project_name == '合计') {
        //start_time = moment(params['time_start']).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        //end_time = moment(params['time_end']).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        start_time = params['time_start']
        end_time = params['time_end']
      } else {
        start_time = moment(project_name).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        end_time = moment(project_name).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
    }
    order
      .getStateDetail({ start_time, end_time })
      .then((res) => {
        if (res.code > 0) {
          row.docking_detail = res.result.channel.filter((item) => item.order_number > 0 || item.arrange_number > 0 || item.docking_number > 0)
          console.log(row.docking_detail)
        } else {
          let msg = res.message || '数据请求失败'
          toast(msg, 'error')
        }
      })
      .finally(() => {
        row.showDetail = false
      })
  }
}

const loadMore = ref(false)
const dataDealList2 = ref([])

const handleScroll = () => {
  if (store.state.isMobile) {
    setTimeout(() => {
      let appContainer = document.querySelector('.app-container')
      if (appContainer.scrollTop + appContainer.clientHeight + 10 >= appContainer.scrollHeight && !loadMore.value && dataDealList.value.length > 0 && dealPage.page < dealPage.countPage) {
        loadMore.value = true
        dealPage.page++
        let start = (dealPage.page - 1) * dealPage.pageSize
        let list = JSON.parse(JSON.stringify(dataDealList2.value))
        list = list.splice(start, dealPage.pageSize)
        dataDealList.value = [...dataDealList.value, ...list]
        loadMore.value = false
      }
    }, 100)
  }
}

// 获取查询数据
const getData = (param) => {
  loading.value = true
  order
    .getAnalysis(param)
    .then((res) => {
      if (res.code > 0) {
        if (param.tab === 'channel') {
          dataChannelList.value = res.result
        } else if (param.tab === 'source') {
          dataSourceList.value = res.result.map((item) => {
            return {
              channel_name: item.channel_name,
              source_name: item.source_name,
              order_number: item.order_number,
              arrange_number: item.arrange_number,
              docking_number: item.docking_number,
              arrange_per: item.arrange_per + '%',
              docking_per: item.docking_per + '%',
            }
          })
        } else if (param.tab === 'area') {
          dataAreaList.value = res.result.map((item) => {
            return { province_name: item.province_name, city_name: item.city_name || '', order_number: item.order_number, arrange_number: item.arrange_number, docking_number: item.docking_number }
          })
        } else if (param.tab === 'deal') {
          res.result.map((item) => (item.showDetail = false))
          if (store.state.isMobile && store.state.adminInfo.branch_id == 1) {
            dataDealList.value = res.result.filter((item) => item.arrange_number > 0 || item.docking_number > 0)
            dataDealList2.value = JSON.parse(JSON.stringify(dataDealList.value))
            dealPage.countPage = Math.ceil(dataDealList2.value.length / dealPage.pageSize)
            dataDealList.value = dataDealList.value.splice(0, dealPage.pageSize)
          } else {
            dataDealList.value = res.result
          }
          if (store.state.isMobile) {
          }

          // if (store.state.adminInfo.branch_id == 1) {
          //   dataDealList.value = res.result.filter((item) => item.arrange_number > 0 || item.docking_number > 0)
          // } else {
          //   dataDealList.value = res.result
          // }
        } else if (param.tab === 'state') {
          res.result.map((item) => (item.showDetail = false))
          dataStateList.value = res.result.filter((item) => item.order_number > 0 || item.arrange_number > 0 || item.docking_number > 0)
        }
      } else {
        let msg = res.message || '数据请求失败'
        toast(msg, 'error')
      }
    })
    .finally(() => {
      loading.value = false
    })
}

// 重置
const onReset = () => {
  params.order_time = ''
  params.order_time_start = ''
  params.order_time_end = ''
  params.mix_time = ''
  params.mix_time_start = ''
  params.mix_time_end = ''
  params.arrange_time = ''
  params.arrange_time_start = ''
  params.arrange_time_end = ''
  params.deal_time = ''
  params.deal_time_start = ''
  params.deal_time_end = ''
  params.year_time_start = ''
  params.year_time_end = ''
  params.month_time_start = ''
  params.month_time_end = ''
  params.week_time_start = ''
  params.week_time_end = ''
  params.time_start = ''
  params.time_end = ''
  params.channel_id = ''
  params.province_id = ''
  params.city_id = ''
  params.region_id = ''
  params.receive_company = ''
  params.branch_status = ''
  params.scope = 'all'
  dataChannelList.value = []
  dataSourceList.value = []
  dataAreaList.value = []
  dataDealList.value = []
  dataStateList.value = []
  pos.value = 0
  spanArr.value = []
  dealPage.page = 1
}

// 获取select数据
const channelList = ref([])
const channel = ref([])
const areaList = ref([])
const province = ref([])
const branchList = ref([])
const branch = ref([])
const regionList = ref([])
const source = computed(() => {
  params.source_id = ''
  if (params.channel_id) {
    let source = []
    channelList.value.forEach((item) => {
      if (params.channel_id.includes(item.id)) {
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
    areaList.value.forEach((item) => {
      if (params.province_id.includes(item.id)) {
        city.push({ label: item.areaname, options: [...item.children] })
      }
    })
    return city
  } else {
    return []
  }
})

// 监听省市变化更新branch数据
watch([() => params.province_id, () => params.city_id], (newValue, oldValue) => {
  dataAreaList.value = []
  pos.value = 0
  spanArr.value = []
  dataDealList.value = []
  params.receive_company = ''
  if (newValue[1]) {
    AreaTableHeader.value = [
      {
        prop: 'province_name',
        label: '省份',
      },
      {
        prop: 'city_name',
        label: '城市',
      },
      {
        prop: 'order_number',
        label: '下单数',
      },
      {
        prop: 'arrange_number',
        label: '派单数',
      },
      {
        prop: 'docking_number',
        label: '签单数',
      },
    ]
  } else {
    AreaTableHeader.value = [
      {
        prop: 'province_name',
        label: '省份',
      },
      {
        prop: 'order_number',
        label: '下单数',
      },
      {
        prop: 'arrange_number',
        label: '派单数',
      },
      {
        prop: 'docking_number',
        label: '签单数',
      },
    ]
  }
  // params.receive_company = ''
  if (newValue[1][0]) {
    branch.value = branchList.value.filter((o) => params.city_id.includes(o.city_id))
  } else if (newValue[0][0]) {
    //console.log(params.province_id)
    // branch.value = branchList.value.filter((o) => o.province_id === newValue[0][0])
    branch.value = branchList.value.filter((o) => params.province_id.includes(o.province_id))
  } else {
    if (params.region_id.length > 0) {
      branch.value = branchList.value.filter((o) => params.region_id.includes(o.region_id))
    } else {
      branch.value = branchList.value
    }
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
      regionList.value = res.result.region
      res.result.area.forEach((item) => {
        province.value.push({ id: item.id, areaname: item.areaname })
      })
      branch.value = branchList.value = res.result.branch
    } else {
      toast(res.message || 'Error', 'error')
    }
  })
}
getSelectData()
</script>
<style lang="scss" scoped>
.el-form-p {
  width: 80%;
}
.el-form-m {
  width: 100%;
}
.el-form-m :deep(.el-input__wrapper),
.state :deep(.el-input__wrapper) {
  width: 100%;
}
.el-button-group {
  margin-right: 10px;
}
.el-form-item__label {
  font-weight: 700;
}
.search-tag {
  margin-bottom: 20px;
}
.search-tag .el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
:deep(.el-form-item__label) {
  font-weight: 700 !important;
}
// :deep(.el-table__expand-icon) {
//   display: none;
// }
.scroll-container {
  height: 100%;
  overflow-y: hidden;
}
.app-container {
  height: 100%;
  overflow-y: scroll;
}
.app-container::-webkit-scrollbar-track-piece {
  background-color: rgba(255, 255, 255, 0.6);
}
.app-container::-webkit-scrollbar {
  width: 5px !important;
  height: 3px;
}
.app-container::-webkit-scrollbar-thumb {
  background-color: #999;
  background-clip: padding-box;
  min-height: 28px;
  overflow-x: hidden;
}
.app-container::-webkit-scrollbar-thumb:hover {
  background-color: #000;
}
</style>
