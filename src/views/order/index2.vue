<!-- 没有拖拽排序 -->
<template>
  <div class="app-container">
    <el-card class="menu-card" shadow="hover">
      <el-tabs v-model="params.tab" @tab-change="getData(1)" v-permission="85">
        <el-tab-pane :label="item.name" :name="item.key" v-for="item in tabbars" :key="item.key" />
      </el-tabs>
      <transition v-bind="listeners">
        <el-form class="search-more" :model="params" ref="searchMoreRef" label-width="60px"
          size="small" v-show="showSearch" :label-position="$store.state.isMobile ? 'top' : 'left'">
          <template v-if="$store.state.adminInfo?.branch_id === '1'">
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="下单时间">
                  <template v-if="!$store.state.isMobile">
                    <el-date-picker style="width: 45%" v-model="params.order_time"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                      range-separator="至" clearable start-placeholder="开始时间"
                      end-placeholder="结束时间" />
                  </template>
                  <template v-else>
                    <el-date-picker style="width: 100%;margin-bottom: 10px;"
                      v-model="params.order_time_start" type="datetime" placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false" clearable />
                    <el-date-picker style="width: 100%" v-model="params.order_time_end"
                      type="datetime" placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="推广渠道">
                  <el-select v-model="params.channel_id" placeholder="选择或搜索渠道" filterable clearable
                    multiple @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in channel"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="客户来源">
                  <el-select v-model="params.source_id" placeholder="选择或搜索来源" filterable clearable
                    multiple @clear="getData(1)">
                    <el-option-group v-for="group in source" :key="group.label"
                      :label="group.label">
                      <el-option :value="item.id" :label="item.name" v-for="item in group.options"
                        :key="item.id"></el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="手机号">
                  <el-input v-model="params.mobile" placeholder="输入客户电话" clearable
                    @clear="getData(1)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="所在省">
                  <el-select v-model="params.province_id" filterable placeholder="选择或搜索省" clearable
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.areaname" v-for="item in province"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="所在市">
                  <el-select v-model="params.city_id" placeholder="选择或搜索城市" filterable clearable
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.areaname" v-for="item in city"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="接单公司">
                  <el-select v-model="params.receive_company" placeholder="选择或搜索公司" clearable
                    multiple filterable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in branch"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="订单状态">
                  <el-select v-model="params.status_id" multiple placeholder="选择状态" clearable
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in status"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="派单时间">
                  <template v-if="!$store.state.isMobile">

                    <el-date-picker style="width: 45%" v-model="params.arrange_time"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                      range-separator="至" clearable start-placeholder="开始时间"
                      end-placeholder="结束时间" />
                  </template>
                  <template v-else>
                    <el-date-picker style="width: 100%;margin-bottom: 10px;"
                      v-model="params.arrange_time_start" type="datetime" placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false" clearable />
                    <el-date-picker style="width: 100%" v-model="params.arrange_time_end"
                      type="datetime" placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="交定时间">
                  <template v-if="!$store.state.isMobile">
                    <el-date-picker style="width: 45%" v-model="params.deal_time"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                      range-separator="至" clearable start-placeholder="开始时间"
                      end-placeholder="结束时间" />
                  </template>
                  <template v-else>
                    <el-date-picker style="width: 100%;margin-bottom: 10px;"
                      v-model="params.deal_time_start" type="datetime" placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false" clearable />
                    <el-date-picker style="width: 100%" v-model="params.deal_time_end"
                      type="datetime" placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="无效标签">
                  <el-select v-model="params.invalid_tag" placeholder="选择标签" clearable multiple
                    @clear="getData(1)">
                    <el-option :value="item.name" :label="item.name" v-for="item in tag"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="审核状态">
                  <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in audit"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="客户回访">
                  <el-select v-model="params.is_visit" placeholder="请选择" clearable multiple
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in visit"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="客户名称">
                  <el-input v-model="params.name" placeholder="输入客户名称" clearable
                    @clear="getData(1)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="客户名称">
                  <el-input v-model="params.name" placeholder="输入客户名称" clearable
                    @clear="getData(1)">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="手机号">
                  <el-input v-model="params.mobile" placeholder="输入客户电话" clearable
                    @clear="getData(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="下单时间">
                  <template v-if="!$store.state.isMobile">

                    <el-date-picker style="width: 45%" v-model="params.order_time"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                      range-separator="至" clearable start-placeholder="开始时间"
                      end-placeholder="结束时间" />
                  </template>
                  <template v-else>
                    <el-date-picker style="width: 100%;margin-bottom: 10px;"
                      v-model="params.order_time_start" type="datetime" placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false" clearable />
                    <el-date-picker style="width: 100%" v-model="params.order_time_end"
                      type="datetime" placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="派单时间">
                  <template v-if="!$store.state.isMobile">

                    <el-date-picker style="width: 45%" v-model="params.arrange_time"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                      range-separator="至" clearable start-placeholder="开始时间"
                      end-placeholder="结束时间" />
                  </template>
                  <template v-else>
                    <el-date-picker style="width: 100%;margin-bottom: 10px;"
                      v-model="params.arrange_time_start" type="datetime" placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false" clearable />
                    <el-date-picker style="width: 100%" v-model="params.arrange_time_end"
                      type="datetime" placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable />
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="交定时间">
                  <template v-if="!$store.state.isMobile">
                    <el-date-picker style="width: 45%" v-model="params.deal_time"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" type="datetimerange"
                      range-separator="至" clearable start-placeholder="开始时间"
                      end-placeholder="结束时间" />
                  </template>
                  <template v-else>
                    <el-date-picker style="width: 100%;margin-bottom: 10px;"
                      v-model="params.deal_time_start" type="datetime" placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false" clearable />
                    <el-date-picker style="width: 100%" v-model="params.deal_time_end"
                      type="datetime" placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" :editable="false" clearable />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="审核状态">
                  <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in audit"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="订单状态">
                  <el-select v-model="params.status_id" multiple placeholder="选择状态" clearable
                    @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in status"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="接单公司">
                  <el-select v-model="params.receive_company" placeholder="选择或搜索公司" clearable
                    multiple filterable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in branch"
                      :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
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
      <ListHeader :rule="{ create: 79, move: 84, export: 81, import: 82, download: 82 }"
        action="/api/order/order/import" @move="handMove" @export="exportExcel"
        @import="importExcel" @download="download">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="small">
          <el-form-item v-show="!showSearch && !$store.state.isMobile" label="">
            <el-input v-model="params.mobile" placeholder="输入手机号" clearable @clear="getData">
            </el-input>
          </el-form-item>
          <el-form-item v-show="(!showSearch && !$store.state.isMobile)" label="">
            <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable
              @clear="getData(1)">
              <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData(1)" v-show="!$store.state.isMobile">搜索
            </el-button>
            <el-button v-permission="86" type="primary" text @click="showSearch = !showSearch"
              class="showSearch">
              {{ showSearch ? '收起' : '展开搜索' }}
              <el-icon>
                <ArrowUp v-if="showSearch" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
            <el-dropdown style="margin-left: 10px;" :hide-on-click="false"
              v-if="!$store.state.isMobile">
              <el-button type="primary" text>
                筛选列<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <div class="fliter_wrap">
                  <div class="fliter_item" v-for="item in columns" :key="item.label"
                    v-show="!item.hide"><el-checkbox v-model="item.show" :label="item.label"
                      size="default" /></div>
                </div>
                <!-- <el-dropdown-menu>
                  <el-dropdown-item v-for="item in columns" :key="item.label"><el-checkbox
                      v-model="item.show" :label="item.label" size="default" /></el-dropdown-item>
                </el-dropdown-menu> -->
              </template>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </ListHeader>
      <template v-if="!$store.state.isMobile">
        <el-table ref="multipleTableRef" :data="dataList" stripe style="width: 100%"
          :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }"
          @sort-change="sortChange" @selection-change="handleSelectionChange" v-loading="loading"
          tooltip-effect="light">
          <el-table-column type="selection" prop="id" width="55" />
          <el-table-column v-if="$store.state.adminInfo?.branch_id === '1' &&columns[0].show"
            prop="channel_name" label="渠道" width="100" />
          <el-table-column prop="order_time" :formatter="dateFormatter" sortable label="下单日期"
            width="120" v-if="columns[1].show" />
          <el-table-column prop="order_time" :formatter="timeFormatter" label="下单时间" width="100"
            v-if="columns[2].show" />
          <el-table-column v-if="$store.state.adminInfo?.branch_id === '1' && columns[3].show"
            prop="source_name" label="来源" width="130" />
          <el-table-column prop="name" label="姓名" width="120" v-if="columns[4].show" />
          <el-table-column label="电话" show-overflow-tooltip width="140" v-if="columns[5].show">
            <template #default="scope">
              <span @click="searchMobile(scope.row.mobile)"
                :class="scope.row.mobile_repeats > 1 ? 'red' : ''">{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="120" column-key="is_audit" :filters="[
        { text: '待跟进', value: '1' },
        { text: '待审核', value: '2' },
        { text: '审核未通过', value: '3' },
        { text: '审核通过', value: '4' },
      ]" :filter-method="filterAudit" v-if="columns[6].show">
            <template #default="scope">
              <el-tag type="danger" style="color: #fb6a3a" v-if="scope.row.is_audit === 1">待跟进
              </el-tag>
              <el-tag type="warning" v-else-if="scope.row.is_audit === 2">待审核</el-tag>
              <div @click="failReason(scope.row.fail_reason)" v-else-if="scope.row.is_audit === 3">
                <el-tag style="cursor: pointer;" type="danger">审核未通过
                </el-tag>
                <p style="cursor: pointer;font-size: 12px;color: #999;">点击查看原因</p>
              </div>
              <el-tag type="success" v-else-if="scope.row.is_audit === 4">审核通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="area" :formatter="areaFormatter" show-overflow-tooltip label="区域"
            width="140" v-if="columns[7].show" />
          <el-table-column prop="address" show-overflow-tooltip label="详细地址" width="140"
            v-if="columns[8].show" />
          <el-table-column prop="type_name" label="房屋类型" width="100" v-if="columns[9].show" />
          <el-table-column prop="is_making" label="是否交房" width="100" v-if="columns[10].show">
            <template #default="scope">
              <el-tag type="warning" v-if="scope.row.is_making === 0">未获知</el-tag>
              <el-tag type="success" v-else-if="scope.row.is_making === 1">未交房</el-tag>
              <el-tag type="danger" v-else-if="scope.row.is_making === 2">已交房</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="layout_name" label="房屋户型" width="100" v-if="columns[11].show" />
          <el-table-column prop="size" label="面积" width="120" v-if="columns[12].show" />
          <el-table-column prop="demand" label="装修需求" show-overflow-tooltip width="120"
            v-if="columns[13].show" />
          <el-table-column prop="other" label="其他" show-overflow-tooltip width="120"
            v-if="columns[14].show" />
          <el-table-column prop="arrange_time" sortable label="派单时间" width="150"
            v-if="columns[15].show" />
          <el-table-column prop="branch_name" show-overflow-tooltip label="接单公司" width="140"
            v-if="columns[16].show" />
          <el-table-column prop="receive_man" show-overflow-tooltip label="接单人" width="100"
            v-if="columns[17].show" />
          <el-table-column prop="status_name" label="订单状态" width="140" v-if="columns[18].show" />
          <el-table-column prop="reason_name" show-overflow-tooltip label="死单原因" width="140"
            v-if="columns[19].show" />
          <el-table-column prop="deal_time" sortable label="反馈交定时间" width="150"
            v-if="columns[20].show" />
          <el-table-column prop="designer" show-overflow-tooltip label="设计师" width="120"
            v-if="columns[21].show" />
          <el-table-column prop="order_money" show-overflow-tooltip label="定金金额" width="100"
            v-if="columns[22].show" />
          <el-table-column prop="signing_time" show-overflow-tooltip label="签约时间" width="140"
            v-if="columns[23].show" />
          <el-table-column prop="contract_money" show-overflow-tooltip label="合同金额" width="120"
            v-if="columns[24].show" />
          <el-table-column prop="start_time" show-overflow-tooltip label="开工时间" width="140"
            v-if="columns[25].show" />
          <el-table-column prop="end_time" show-overflow-tooltip label="完工时间" width="140"
            v-if="columns[26].show" />
          <el-table-column prop="construction_manager" show-overflow-tooltip label="施工经理"
            width="120" v-if="columns[27].show" />
          <el-table-column prop="quality_man" show-overflow-tooltip label="质监" width="120"
            v-if="columns[28].show" />
          <el-table-column prop="is_amount" label="是否量房" width="100" v-if="columns[29].show">
            <template #default="scope">
              <el-tag type="warning" v-if="scope.row.is_amount === 0">未获知</el-tag>
              <el-tag type="success" v-else-if="scope.row.is_amount === 1">未量房</el-tag>
              <el-tag type="danger" v-else-if="scope.row.is_amount === 2">已量房</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="follow_time" sortable label="最新跟进时间" width="160"
            v-if="columns[30].show" />
          <el-table-column show-overflow-tooltip label="最新跟进进展" width="180" v-if="columns[31].show">
            <template #default="scope">
              {{ scope.row.follows.length > 0 ? scope.row.follows[0]['follow_note'] : '' }}
            </template>
          </el-table-column>
          <el-table-column v-if="$store.state.adminInfo?.branch_id === '1' && columns[32].show"
            label="无效标签" width="160">
            <template #default="scope">
              <span style="color: #ff5722">{{ scope.row.invalid_tag }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="$store.state.adminInfo?.branch_id === '1' && columns[33].show"
            prop="is_visit" label="客户回访" width="160">
            <template #default="scope">
              <el-tag type="warning" v-if="scope.row.is_visit === 1">待回访</el-tag>
              <el-tag v-else-if="scope.row.is_visit === 2">无需回访</el-tag>
              <el-tag type="success" v-else-if="scope.row.is_visit === 3">已回访</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="$store.state.adminInfo?.branch_id === '1' && columns[34].show"
            prop="visit_time" sortable label="最近回访时间" width="150" />
          <el-table-column v-if="$store.state.adminInfo?.branch_id === '1' && columns[35].show"
            prop="v_remark" label="最近回访说明" show-overflow-tooltip width="160">
            <template #default="scope">
              {{ scope.row.visit.length > 0 ? scope.row.visit[0]['remark'] : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="user_name" show-overflow-tooltip label="录入者" width="120"
            v-if="$store.state.adminInfo?.branch_id === '1' && columns[36].show" />
          <el-table-column prop="create_time" sortable label="录入时间" width="160"
            v-if="$store.state.adminInfo?.branch_id === '1' && columns[37].show" />
          <el-table-column label="操作"
            :min-width="$store.state.adminInfo?.branch_id === '1' ? 210 : 150" fixed="right">
            <template #default="scope">
              <el-button v-if="params.tab !== 'recyc'" v-permission="83" size="small" type="success"
                @click="handleDetail(scope.row.id)">详情 </el-button>
              <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo?.branch_id === '1'"
                v-permission="80" size="small" type="primary"
                @click="$router.push('/order/edit/' + scope.row.id)">编辑 </el-button>
              <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo?.branch_id !== '1'"
                type="primary" v-permission="80" size="small" @click="handleFollow(scope.row)"
                :loading="scope.row.followLoading"> 编辑
              </el-button>
              <el-button v-if="params.tab !== 'recyc'" v-permission="87" size="small" type="danger"
                @click="handleDelete(scope.row.id)"> 删除 </el-button>
              <el-button v-if="params.tab == 'recyc'" v-permission="88" size="small" type="success"
                @click="handleResave(scope.row.id)">恢复 </el-button>
              <el-button v-if="params.tab == 'recyc'" v-permission="128" size="small" type="danger"
                @click="handleDel(scope.row.id)"> 彻底删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <div class="order-item" v-for="item in dataList" :key="item.id">
          <div class="hot-badge"
            style="background: #fef0f0;color: #f56c6c;border: 1px solid #f56c6c;"
            v-if="item.is_audit === 1">待跟进</div>
          <div class="hot-badge" style="color:#e6a23c;background: #fdf6ec;border: 1px solid #f3d19e"
            v-else-if="item.is_audit === 2">待审核
          </div>
          <div class="hot-badge" v-else-if="item.is_audit === 3">审核未通过</div>
          <div class="hot-badge" style="color:#67c23a;background: #f0f9eb;border: 1px solid #b3e19d"
            v-else-if="item.is_audit === 4">审核通过
          </div>
          <el-descriptions :column="1">
            <el-descriptions-item label="下单时间">{{ item.order_time_mobile }}</el-descriptions-item>
            <el-descriptions-item label="客户名称">{{ item.name }}</el-descriptions-item>
            <el-descriptions-item label="客户电话">{{ item.mobile }}</el-descriptions-item>
            <el-descriptions-item label="客户地址">
              {{ item.province_name }}{{ item.city_name }}{{ item.address }}
            </el-descriptions-item>
            <el-descriptions-item label="订单状态">
              <el-tag>{{ item.status_name }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="跟进信息："></el-descriptions-item>
            <el-descriptions-item v-if="item.follows.length > 0">
              <el-descriptions style="margin-left: 0px;margin-top: -20px;" :column="1" border>
                <!-- <template v-for="item in item.follows" :key="item.id"> -->
                <el-descriptions-item label="跟进时间">{{ parseTime(item.follows[0].follow_time) }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="跟进说明">{{ item.follows[0].follow_note }}</el-descriptions-item>
                <!-- </template> -->
              </el-descriptions>
            </el-descriptions-item>
          </el-descriptions>
          <div class="buttons-mobile">
            <el-button v-if="params.tab !== 'recyc'" v-permission="83" size="small" type="success"
              @click="handleDetail(item.id)">详情 </el-button>
            <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo?.branch_id === '1'"
              v-permission="80" size="small" type="primary"
              @click="$router.push('/order/edit/' + item.id)">编辑 </el-button>
            <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo?.branch_id !== '1'"
              type="primary" v-permission="80" size="small" @click="handleFollow(item)"
              :loading="item.followLoading"> 编辑
            </el-button>
            <el-button v-if="params.tab !== 'recyc'" v-permission="87" size="small" type="danger"
              @click="handleDelete(item.id)"> 删除 </el-button>
            <el-button v-if="params.tab == 'recyc'" v-permission="88" size="small" type="success"
              @click="handleResave(item.id)">恢复 </el-button>
            <el-button v-if="params.tab == 'recyc'" v-permission="128" size="small" type="danger"
              @click="handleDel(item.id)"> 彻底删除 </el-button>
          </div>
          <el-divider border-style="dotted" />
        </div>
      </template>
      <el-pagination v-model:current-page="params.page" v-model:page-size="params.pageSize"
        :page-sizes="[10, 15, 50, 100, 200, 1000]" :background="true"
        layout="total, sizes, prev, pager, next,slot, jumper" :total="count"
        @current-change="handleCurrentChange" @size-change="handleSizeChange"
        v-show="!$store.state.isMobile" />
      <el-pagination @current-change="handleCurrentChange" :current-page="params.page"
        :page-size="params.pageSize" :background="true" :layout="'total, prev, next'" :total="count"
        class="fenye" v-show="$store.state.isMobile" />
    </el-card>
    <follow ref="followRef" :status="statusLists" :form="form" @submit="followSubmit" />
    <detail ref="detailRef" :detail="details" />
    <el-dialog v-model="dialogVisible" title="审核未通过原因" width="40%">
      <div class="main">
        <div style="font-size: 14px; color: #333; line-height: 24px; margin: 0 0 15px">{{ reason }}
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogMoveVisible" destroy-on-close title="数据移动" width="60%"
      @close="moveDialogClose">
      <div class="main">
        <el-form :model="moveForm" ref="moveFormRef" label-width="80px">
          <el-tabs v-model="moveTab" @tab-change="moveTabChange">
            <el-tab-pane label="渠道来源" name="move_channel">
              <el-form-item label="渠道" prop="channel_id">
                <el-select v-model="moveForm.channel_id" placeholder="请选择渠道">
                  <el-option :disabled="item.status === 0" :value="item.id" :label="item.name"
                    v-for="item in channel" :key="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="来源" prop="source_id">
                <el-select v-model="moveForm.source_id" placeholder="请选择来源">
                  <el-option :disabled="item.status === 0" :value="item.id" :label="item.name"
                    v-for="item in sources" :key="item.id" />
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="接单公司" name="move_store">
              <el-form-item label="接单公司" prop="receive_company">
                <el-select v-model="moveForm.receive_company" filterable placeholder="请选择接单公司,可搜索">
                  <el-option :disabled="item.status === 2" :value="item.id" :label="item.name"
                    v-for="item in branchList" :key="item.id" />
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
import FormDialog from '@/components/FormDialog.vue'
import detail from './compontens/detail.vue'
import follow from './compontens/follow.vue'
import { computed, reactive, ref, watch } from 'vue'
import order from '@/api/order'
import { toast, parseTime, elLoading, closeElLoading } from '@/utils/utils'
import { useInitTable } from '@/hooks/useCommon'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
let is__audit = null
let is__sign = null
let is__arrange = null
if (route.query.is_audit) {
  is__audit = route.query.is_audit
}
if (route.query.is_sign) {
  is__sign = route.query.is_sign
}
if (route.query.is_arrange) {
  is__arrange = route.query.is_arrange
}

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
    pageSize: 15,
    name: '',
    mobile: '',
    receive_company: null,
    order_time: '',
    order_time_start: '',
    order_time_end: '',
    order_time: '',
    province_id: '',
    city_id: '',
    channel_id: null,
    source_id: null,
    status_id: null,
    arrange_time: '',
    arrange_time_start: '',
    arrange_time_end: '',
    deal_time: '',
    deal_time_start: '',
    deal_time_end: '',
    invalid_tag: null,
    is_audit: is__audit,
    is_visit: null,
    is_arrange: is__arrange,
    is_sign: is__sign,
    tab: 'all',
  },
  onGetListSuccess: (res) => {
    count.value = res.result.total
    dataList.value = res.result.data.map((o) => {
      o.followLoading = false
      o.order_time_mobile = parseTime(o.order_time, '{y}-{m}-{d} {h}:{i}')
      o.arrange_time = parseTime(o.arrange_time, '{y}-{m}-{d} {h}:{i}')
      o.deal_time = parseTime(o.deal_time, '{y}-{m}-{d} {h}:{i}')
      o.follow_time = parseTime(parseInt(o.follow_time), '{y}-{m}-{d} {h}:{i}')
      o.visit_time = parseTime(parseInt(o.visit_time), '{y}-{m}-{d} {h}:{i}')
      o.signing_time = parseTime(parseInt(o.signing_time), '{y}-{m}-{d} {h}:{i}')
      o.start_time = parseTime(parseInt(o.start_time), '{y}-{m}-{d} {h}:{i}')
      o.end_time = parseTime(parseInt(o.end_time), '{y}-{m}-{d} {h}:{i}')
      o.order_money = o.order_money == 0 ? '' : o.order_money
      o.contract_money = o.contract_money == 0 ? '' : o.contract_money
      return o
    })
  },
})
if (route.query.is_audit) {
  params.is_audit = [parseInt(route.query.is_audit)]
}
if (route.query.is_sign) {
  params.tab = 'sign'
}
if (route.query.is_arrange) {
  params.tab = 'arrange'
}

// 表格字段
let isHide = store.state.adminInfo.branch_id != 1 ? true : false
console.log(isHide)
const columns = ref([
  { prop: 'channel_name', label: '渠道', show: true, hide: isHide },
  { prop: 'order_time', label: '下单日期', show: true, hide: false },
  { prop: 'order_time', label: '下单时间', show: true, hide: false },
  { prop: 'source_name', label: '来源', show: true, hide: isHide },
  { prop: 'name', label: '姓名', show: true, hide: false },
  { prop: 'mobile', label: '电话', show: true, hide: false },
  { prop: 'is_audit', label: '审核状态', show: true, hide: false },
  { prop: 'area', label: '区域', show: true, hide: false },
  { prop: 'address', label: '详细地址', show: true, hide: false },
  { prop: 'type_name', label: '房屋类型', show: false, hide: false },
  { prop: 'is_making', label: '是否交房', show: false, hide: false },
  { prop: 'layout_name', label: '房屋户型', show: false, hide: false },
  { prop: 'size', label: '面积', show: true, hide: false },
  { prop: 'demand', label: '装修需求', show: true, hide: false },
  { prop: 'other', label: '其他', show: false, hide: false },
  { prop: 'arrange_time', label: '派单时间', show: true, hide: false },
  { prop: 'branch_name', label: '接单公司', show: true, hide: false },
  { prop: 'receive_man', label: '接单人', show: false, hide: false },
  { prop: 'status_name', label: '订单状态', show: true, hide: false },
  { prop: 'reason_name', label: '死单原因', show: false, hide: isHide },
  { prop: 'deal_time', label: '反馈交定时间', show: true, hide: false },
  { prop: 'designer', label: '设计师', show: false, hide: false },
  { prop: 'order_money', label: '定金金额', show: false, hide: false },
  { prop: 'signing_time', label: '签约时间', show: false, hide: false },
  { prop: 'contract_money', label: '合同金额', show: false, hide: false },
  { prop: 'start_time', label: '开工时间', show: false, hide: false },
  { prop: 'end_time', label: '完工时间', show: false, hide: false },
  { prop: 'construction_manager', label: '施工经理', show: false, hide: false },
  { prop: 'quality_man', label: '质监', show: false, hide: false },
  { prop: 'is_amount', label: '是否量房', show: false, hide: false },
  { prop: 'follow_time', label: '最新跟进时间', show: true, hide: false },
  { prop: 'follow_note', label: '最新跟进进展', show: true, hide: false },
  { prop: 'invalid_tag', label: '无效标签', show: true, hide: isHide },
  { prop: 'is_visit', label: '客户回访', show: true, hide: isHide },
  { prop: 'visit_time', label: '最近回访时间', show: true, hide: isHide },
  { prop: 'visit_remark', label: '最近回访说明', show: true, hide: isHide },
  { prop: 'user_name', label: '录入者', show: false, hide: isHide },
  { prop: 'create_time', label: '录入时间', show: false, hide: isHide },
])

// 加载详情
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

const dateFormatter = (row, column) => {
  return parseTime(row.order_time, '{y}-{m}-{d}')
}
const timeFormatter = (row, column) => {
  return parseTime(row.order_time, '{h}:{i}')
}
const areaFormatter = (row, column) => {
  return row.province_name + row.city_name
}
// 审核状态过滤
const filterAudit = (value, row, column) => {
  const property = column['property']
  return row.is_audit == value
  // params.is_audit = 2
  // getData(1)
}

const dialogVisible = ref(false)
const reason = ref('')
// 查看审核失败原因
const failReason = (val) => {
  reason.value = val
  dialogVisible.value = true
}

watch(
  route,
  () => {
    if (route.query.reload) {
      // getData()
      route.query.page ? getData(1) : getData()
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

getSelectData()

// 表单重置
const resetFrom = () => {
  if (!searchMoreRef.value) return
  // searchMoreRef.value.resetFields()
  params.page = 1
  params.pageSize = 15
  params.name = ''
  params.mobile = ''
  params.receive_company = null
  params.order_time = ''
  params.order_time_start = ''
  params.order_time_end = ''
  params.province_id = ''
  params.city_id = ''
  params.channel_id = null
  params.source_id = null
  params.status_id = null
  params.arrange_time = ''
  params.arrange_time_start = ''
  params.arrange_time_end = ''
  params.deal_time = ''
  params.deal_time_start = ''
  params.deal_time_end = ''
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

// 订单跟进
const form = reactive({
  name: '',
  mobile: '',
  address: '',
  designer: '',
  follows: [{ follow_time: '', follow_note: '' }],
  status_id: 1,
  deal_time: '',
  order_money: '',
  signing_time: '',
  contract_money: '',
  start_time: '',
  end_time: '',
  construction_manager: '',
  quality_man: '',
})
const orderId = ref(0)
const followRef = ref('')
const statusLists = ref(null)
const handleFollow = (row) => {
  orderId.value = row.id
  row.followLoading = true
  order
    .read(row.id)
    .then((res) => {
      if (res.code > 0) {
        statusLists.value = statusList.value
        let result = res.result
        for (const key in form) {
          form[key] = result[key]
        }
        form.deal_time = parseTime(form.deal_time)
        form.signing_time = parseTime(form.signing_time)
        form.start_time = parseTime(form.start_time)
        form.end_time = parseTime(form.end_time)
        form.follows = form.follows.map((item) => {
          return { follow_time: parseTime(item.follow_time), follow_note: item.follow_note }
        })
        form.follows.push({ follow_time: '', follow_note: '' })
        row.followLoading = false
        followRef.value.openFollowDrawer()
      } else {
        toast(res.message || 'error', 'error')
        return false
      }
    })
    .finally(() => {
      row.followLoading = false
    })
}
const followSubmit = () => {
  // 分公司更新--审核
  form.is_audit = 2
  if (form.status_id == 1) {
    toast('请修改订单状态', 'error')
    return false
  }
  if (form.status_id == 3 || form.status_id == 4 || form.status_id == 5 || form.status_id == 6) {
    if (form.order_money == 0) {
      toast('请填写订单金额', 'error')
      return false
    }
  }
  // 跟进信息数据处理
  let follow = form.follows.filter((item) => item.follow_time && item.follow_note)
  // 后台会自动删除空数组，导致报错
  if (follow.length === 0) {
    toast('请填写跟进信息', 'error')
    return false
  }

  form.follows = follow

  followRef.value.showLoading()
  order
    .follow(orderId.value, form)
    .then((res) => {
      if (res.code > 0) {
        toast('数据更新成功')
        followRef.value.CloseFollowDrawer()
        for (const key in form) {
          form[key] = ''
        }
        form.follows = [{ follow_time: '', follow_note: '' }]
        form.status_id = 1
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
</script>
<style lang="scss" scoped>
.search-more {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  overflow: hidden;
  transition: height 0.22s ease-in-out;
}
.showSearch:hover,
.showSearch:focus {
  color: var(--color);
}
.el-tabs {
  margin-bottom: 10px;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
.order-item {
  position: relative;
}
.hot-badge {
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 12px;
  background: #f56c6c;
  color: #fff;
  width: 80px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 22px;
  transform: rotate(19deg);
}
.buttons-mobile {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  font-weight: normal !important;
  width: 100px !important;
}
.fliter_wrap {
  padding: 10px;
  width: 280px;
  overflow: hidden;
}
.fliter_wrap .fliter_item {
  width: 130px;
  float: left;
}
</style>
