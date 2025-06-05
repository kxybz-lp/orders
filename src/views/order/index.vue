<template>
  <div class="app-container">
    <el-card class="order-card" shadow="hover">
      <el-tabs v-model="params.tab" @tab-change="tabChange" v-permission="85">
        <el-tab-pane :label="item.name" :name="item.key" v-for="item in tabbars" :key="item.key" />
      </el-tabs>
      <transition v-bind="listeners">
        <el-form class="search-more" :model="params" ref="searchMoreRef" label-width="68px" v-show="showSearch" :label-position="$store.state.isMobile ? 'top' : 'left'">
          <template v-if="$store.state.adminInfo.branch_id == 1">
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="下单时间">
                  <template v-if="!$store.state.isMobile">
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
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.order_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.order_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="推广渠道">
                  <el-select v-model="params.channel_id" placeholder="选择或搜索渠道" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in channel" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="客户来源">
                  <el-select v-model="params.source_id" placeholder="选择或搜索来源" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
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
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="派单时间">
                  <template v-if="!$store.state.isMobile">
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
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.arrange_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.arrange_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="所在省">
                  <el-select v-model="params.province_id" filterable placeholder="选择或搜索省" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.areaname" v-for="item in province" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="所在市">
                  <el-select v-model="params.city_id" placeholder="选择或搜索城市" filterable clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.areaname" v-for="item in city" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="接单公司">
                  <el-select v-model="params.receive_company" placeholder="选择或搜索公司" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip filterable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in branch" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="交定时间">
                  <template v-if="!$store.state.isMobile">
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
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.deal_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.deal_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="订单状态">
                  <el-select v-model="params.status_id" multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip placeholder="选择状态" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in status" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="审核状态">
                  <el-select v-model="params.is_audit" multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip placeholder="选择状态" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="无效标签">
                  <el-select v-model="params.invalid_tag" placeholder="选择标签" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                    <el-option :value="item.name" :label="item.name" v-for="item in tag" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="录入时间">
                  <template v-if="!$store.state.isMobile">
                    <el-date-picker
                      style="width: 45%"
                      v-model="params.create_time"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      type="datetimerange"
                      range-separator="至"
                      clearable
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                    />
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.create_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.create_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="一级区域">
                  <el-select v-model="params.region_id" placeholder="选择一级区域" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in regionList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="客户回访">
                  <el-select v-model="params.is_visit" placeholder="请选择" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in visit" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="客户名称">
                  <el-input v-model="params.name" placeholder="输入客户名称" clearable
                    @clear="getData(1)">
                  </el-input>
                </el-form-item>
              </el-col> -->
              <el-col :md="6" :offset="0">
                <el-form-item label="死单标签">
                  <el-select v-model="params.reason_id" multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip placeholder="选择标签" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in reasonList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="房屋面积">
                  <el-select v-model="params.size" placeholder="选择面积" clearable @clear="getData(1)">
                    <el-option :value="item.value" :label="item.key" v-for="item in sizeList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="房屋类型">
                  <el-select v-model="params.type_id" placeholder="选择类型" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in typeList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="房屋户型">
                  <el-select v-model="params.layout_id" placeholder="选择户型" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in layoutList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="派单类型">
                  <el-select v-model="params.arrange_type" placeholder="选择派单类型" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in arrangeType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="渠道类型">
                  <el-select v-model="params.channel_status" placeholder="选择渠道类型" clearable collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in channeStatuslList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="客户名称">
                  <el-input v-model="params.name" placeholder="输入客户名称" clearable @clear="getData(1)"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="手机号">
                  <el-input v-model="params.mobile" placeholder="输入客户电话" clearable @clear="getData(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="下单时间">
                  <template v-if="!$store.state.isMobile">
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
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.order_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.order_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="派单时间">
                  <template v-if="!$store.state.isMobile">
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
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.arrange_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.arrange_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="交定时间">
                  <template v-if="!$store.state.isMobile">
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
                  </template>
                  <template v-else>
                    <el-date-picker
                      style="width: 100%; margin-bottom: 10px"
                      v-model="params.deal_time_start"
                      type="datetime"
                      placeholder="开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                    <el-date-picker
                      style="width: 100%"
                      v-model="params.deal_time_end"
                      type="datetime"
                      placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      :editable="false"
                      clearable
                    />
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="审核状态">
                  <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id"></el-option>
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
              <el-col :md="6" :offset="0">
                <el-form-item label="接单公司">
                  <el-select v-model="params.receive_company" placeholder="选择或搜索公司" clearable multiple filterable @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in branch" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6" :offset="0">
                <el-form-item label="派单类型">
                  <el-select v-model="params.arrange_type" placeholder="选择派单类型" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                    <el-option :value="item.id" :label="item.name" v-for="item in arrangeType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="房屋面积">
                  <el-select v-model="params.size" placeholder="选择面积" clearable @clear="getData(1)">
                    <el-option :value="item.value" :label="item.key" v-for="item in sizeList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :offset="0">
                <el-form-item label="接单人">
                  <el-input v-model="params.receive_man" placeholder="输入接单人名称" clearable @clear="getData(1)"> </el-input>
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
      <ListHeader
        :rule="{ create: 79, move: 84, export: 81, import: 82, download: 82 }"
        action="https://api.xydec.com.cn/order/order/import"
        @move="handMove"
        @export="exportExcel"
        @import="importExcel"
        @download="download"
      >
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="default">
          <el-form-item v-show="!showSearch && !$store.state.isMobile" label="">
            <el-input v-model="params.mobile" placeholder="输入手机号" clearable @clear="getData"> </el-input>
          </el-form-item>
          <!-- <el-form-item v-show="(!showSearch && !$store.state.isMobile)" label="">
            <el-select v-model="params.is_audit" multiple placeholder="选择状态" clearable
              @clear="getData(1)">
              <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <!-- <el-button type="primary" @click="checkOpenid">测试
            </el-button> -->
            <el-button type="primary" @click="getData(1)" v-show="!showSearch && !$store.state.isMobile">搜索 </el-button>
            <el-button v-permission="86" type="primary" text @click="handleShowSearch" class="showSearch">
              {{ showSearch ? '收起' : '展开搜索' }}
              <el-icon>
                <ArrowUp v-if="showSearch" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
            <el-dropdown style="margin-left: 10px" :max-height="500" :hide-on-click="false" v-if="!$store.state.isMobile">
              <el-button type="primary" text>
                筛选列<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <div class="fliter_wrap">
                  <div class="fliter_item" v-for="(item, index) in columns" :key="item.label" v-show="item.prop != 'id' || item.prop != 'operation'">
                    <el-checkbox
                      v-model="item.show"
                      :label="item.label"
                      size="default"
                      @change="fliterChange($event, index)"
                      :disabled="item.prop == 'id' || item.prop == 'operation' ? true : false"
                    />
                  </div>
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
          <template v-for="item in columns">
            <el-table-column
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              :type="item.type"
              :sortable="item.sortable"
              :fixed="item.fixed"
              :class-name="item.isDrag"
              align="left"
              show-overflow-tooltip
              v-if="item.show"
            >
              <template #default="scope">
                <div v-if="item.prop == 'is_audit'">
                  <el-tag type="danger" style="color: #fb6a3a" v-if="scope.row.is_audit === 1">待跟进 </el-tag>
                  <el-tag type="warning" v-else-if="scope.row.is_audit === 2">待审核</el-tag>
                  <div @click="failReason(scope.row.fail_reason)" v-else-if="scope.row.is_audit === 3">
                    <el-tag style="cursor: pointer" type="danger">审核未通过 </el-tag>
                    <p style="cursor: pointer; font-size: 12px; color: #999">点击查看原因</p>
                  </div>
                  <el-tag type="success" v-else-if="scope.row.is_audit === 4">审核通过</el-tag>
                </div>
                <div v-else-if="item.prop == 'arrange_type'">
                  <div v-if="scope.row.arrange_type == 1">客服派单</div>
                  <div v-else-if="scope.row.arrange_type == 2" style="color: #f00">系统派单</div>
                </div>
                <div v-else-if="item.prop == 'mobile'">
                  <div style="cursor: pointer">
                    <span :key="scope.row.id" @click.stop="searchMobile(scope.row.mobile)" v-mobile="scope.row.mobile" :class="scope.row.mobile_repeats > 1 ? 'red' : ''">{{ scope.row.mobile }}</span>
                    <el-tooltip
                      effect="light"
                      content="复制手机号"
                      v-if="$store.state.adminInfo.role_id == 3 || $store.state.adminInfo.role_id == 4 || $store.state.adminInfo.role_id == 5 || $store.state.adminInfo.role_id == 6"
                      placement="top-start"
                    >
                      <el-icon style="margin-left: 5px" v-copy.stop="scope.row.mobile" :key="scope.row.id">
                        <CopyDocument />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </div>
                <div v-else-if="item.prop == 'area'">{{ scope.row.province_name }}{{ scope.row.city_name }}</div>
                <div v-else-if="item.prop == 'is_making'">
                  <el-tag type="info" v-if="scope.row.is_making === 0">未获知 </el-tag>
                  <el-tag type="warning" v-else-if="scope.row.is_making === 1">未交房</el-tag>
                  <el-tag type="success" v-else-if="scope.row.is_making === 2">已交房</el-tag>
                </div>
                <div v-else-if="item.prop == 'is_amount'">
                  <el-tag type="info" v-if="scope.row.is_amount === 0">未获知 </el-tag>
                  <el-tag type="warning" v-else-if="scope.row.is_amount === 1">未量房</el-tag>
                  <el-tag type="success" v-else-if="scope.row.is_amount === 2">已量房</el-tag>
                </div>
                <div v-else-if="item.prop == 'follow_note'">
                  {{ scope.row.follows.length > 0 ? scope.row.follows[0]['follow_note'] : '' }}
                </div>
                <div v-else-if="item.prop == 'is_visit'">
                  <el-tag type="info" v-if="scope.row.is_visit === 1">待回访 </el-tag>
                  <el-tag type="warning" v-else-if="scope.row.is_visit === 2">无需回访</el-tag>
                  <el-tag type="success" v-else-if="scope.row.is_visit === 3">已回访</el-tag>
                </div>
                <div v-else-if="item.prop == 'visit_remark'">
                  {{ scope.row.visit.length > 0 ? scope.row.visit[0]['remark'] : '' }}
                </div>
                <div v-else-if="item.prop == 'operation'">
                  <el-button v-if="params.tab !== 'recyc'" v-permission="83" size="small" type="success" @click="handleDetail(scope.row.id)">详情 </el-button>
                  <el-button
                    v-if="params.tab !== 'recyc' && $store.state.adminInfo.branch_id === '1' && $store.state.adminInfo.id != '781'"
                    v-permission="80"
                    size="small"
                    type="primary"
                    @click="$router.push('/order/edit/' + scope.row.id)"
                    >编辑
                  </el-button>
                  <el-button
                    v-if="params.tab !== 'recyc' && $store.state.adminInfo.branch_id !== '1'"
                    type="primary"
                    v-permission="80"
                    size="small"
                    @click="handleFollow(scope.row)"
                    :loading="scope.row.followLoading"
                  >
                    编辑
                  </el-button>
                  <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo.id != '781'" v-permission="87" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
                  <el-button v-if="params.tab == 'recyc'" v-permission="88" size="small" type="success" @click="handleResave(scope.row.id)">恢复 </el-button>
                  <el-button v-if="params.tab == 'recyc'" v-permission="128" size="small" type="danger" @click="handleDel(scope.row.id)"> 彻底删除 </el-button>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </template>
      <template v-else>
        <div class="order-item" v-for="item in dataList" :key="item.id">
          <div class="hot-badge" style="background: #fef0f0; color: #f56c6c; border: 1px solid #fde2e2" v-if="item.status_name === '未获知'">{{ item.status_name }}</div>
          <div class="hot-badge" style="color: #e6a23c; background: #fdf6ec; border: 1px solid #f3d19e" v-else-if="item.status_name === '持续跟进'">{{ item.status_name }}</div>
          <div class="hot-badge" style="color: #67c23a; background: #f0f9eb; border: 1px solid #e1f3d8" v-else-if="item.status_name === '已交定'">{{ item.status_name }}</div>
          <div class="hot-badge" style="color: #67c23a; background: #f0f9eb; border: 1px solid #b3e19d" v-else-if="item.status_name === '已签合同'">{{ item.status_name }}</div>
          <div class="hot-badge" style="color: #67c23a; background: #f0f9eb; border: 1px solid #b3e19d" v-else-if="item.status_name === '施工中'">{{ item.status_name }}</div>
          <div class="hot-badge" style="color: #67c23a; background: #f0f9eb; border: 1px solid #b3e19d" v-else-if="item.status_name === '完工结算'">{{ item.status_name }}</div>
          <div class="hot-badge" style="color: #409eff; background: #ecf5ff; border: 1px solid #d9ecff" v-else-if="item.status_name === '撞单'">{{ item.status_name }}</div>
          <div class="hot-badge" style="background: #f4f4f5; color: #909399; border: 1px solid #e9e9eb" v-else-if="item.status_name === '死单'">
            {{ item.status_name }}
          </div>
          <div class="hot-badge" style="color: #409eff; background: #ecf5ff; border: 1px solid #d9ecff" v-else-if="item.status_name === '退订'">{{ item.status_name }}</div>
          <el-descriptions :column="1">
            <el-descriptions-item label="订单类型" v-if="$store.state.adminInfo.branch_id !== '1'">{{ item.type }}</el-descriptions-item>
            <el-descriptions-item label="派单类型" v-if="item.arrange_type == 1">客服派单</el-descriptions-item>
            <el-descriptions-item label="派单类型" v-if="item.arrange_type == 2">
              <span style="color: #f00">系统派单</span>
            </el-descriptions-item>
            <el-descriptions-item label="客户名称">{{ item.name }}</el-descriptions-item>
            <el-descriptions-item label="客户电话"
              ><span v-mobile="item.mobile">{{ item.mobile }}</span
              ><el-tag
                v-if="$store.state.adminInfo.role_id == 3 || $store.state.adminInfo.role_id == 4 || $store.state.adminInfo.role_id == 5 || $store.state.adminInfo.role_id == 6"
                style="margin-left: 5px"
                type="info"
                v-copy="item.mobile"
                >复制手机号</el-tag
              ></el-descriptions-item
            >
            <el-descriptions-item label="下单时间">{{ item.order_time_mobile }}</el-descriptions-item>
            <el-descriptions-item label="派单时间" v-if="item.arrange_time">{{ item.arrange_time }}</el-descriptions-item>
            <el-descriptions-item label="签单时间" v-if="item.deal_time">{{ item.deal_time }}</el-descriptions-item>
            <el-descriptions-item label="渠道来源" v-if="$store.state.adminInfo.branch_id === '1'">{{ item.channel_name }}/{{ item.source_name }}</el-descriptions-item>
            <el-descriptions-item label="客户地址"> {{ item.province_name }}{{ item.city_name }}{{ item.address }} </el-descriptions-item>
            <el-descriptions-item label="接单公司">{{ item.branch_name }}</el-descriptions-item>
            <el-descriptions-item label="订单备注">{{ item.other }}</el-descriptions-item>
            <el-descriptions-item label="审核状态">
              <el-tag v-if="item.is_audit === 1">待跟进</el-tag>
              <el-tag type="warning" v-if="item.is_audit === 2">待审核</el-tag>
              <el-tag type="danger" v-else-if="item.is_audit === 3">审核未通过</el-tag>
              <el-tag type="success" v-else-if="item.is_audit === 4">审核通过</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="失败原因" v-if="item.is_audit === 3">{{ item.fail_reason }}</el-descriptions-item>
            <el-descriptions-item v-if="item.follows.length > 0" label="跟进信息："></el-descriptions-item>
            <el-descriptions-item v-if="item.follows.length > 0">
              <el-descriptions style="margin-left: 0px; margin-top: -20px" :column="1" border>
                <!-- <template v-for="item in item.follows" :key="item.id"> -->
                <el-descriptions-item label="跟进时间">{{ parseTime(item.follows[0].follow_time) }} </el-descriptions-item>
                <el-descriptions-item label="跟进说明">{{ item.follows[0].follow_note }}</el-descriptions-item>
                <!-- </template> -->
              </el-descriptions>
            </el-descriptions-item>
          </el-descriptions>
          <div class="buttons-mobile">
            <el-button v-if="params.tab !== 'recyc'" v-permission="83" size="default" type="success" @click="handleDetail(item.id)">详情 </el-button>
            <el-button
              v-if="params.tab !== 'recyc' && $store.state.adminInfo.branch_id === '1' && $store.state.adminInfo.id != '781'"
              v-permission="80"
              size="default"
              type="primary"
              @click="$router.push('/order/edit/' + item.id)"
              >编辑
            </el-button>
            <el-button
              v-if="params.tab !== 'recyc' && $store.state.adminInfo.branch_id !== '1'"
              type="primary"
              v-permission="80"
              size="default"
              @click="handleFollow(item)"
              :loading="item.followLoading"
            >
              编辑
            </el-button>
            <el-button v-if="params.tab !== 'recyc' && $store.state.adminInfo.id != '781'" v-permission="87" size="default" type="danger" @click="handleDelete(item.id)"> 删除 </el-button>
            <el-button v-if="params.tab == 'recyc'" v-permission="88" size="small" type="success" @click="handleResave(item.id)">恢复 </el-button>
            <el-button v-if="params.tab == 'recyc'" v-permission="128" size="small" type="danger" @click="handleDel(item.id)"> 彻底删除 </el-button>
          </div>
          <el-divider border-style="dotted" />
        </div>
      </template>
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 15, 50, 100, 200, 1000]"
        :background="true"
        layout="total, sizes, prev, pager, next,slot, jumper"
        :total="count"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        v-show="!$store.state.isMobile"
      />
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.pageSize"
        :background="true"
        :layout="'total, prev, next'"
        :total="count"
        class="fenye"
        v-show="$store.state.isMobile"
      />
    </el-card>
    <follow ref="followRef" @closeFollow="closeFollow" />
    <detail ref="detailRef" :detail="details" @follow="handleFollow" />
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
            <el-tab-pane label="房屋类型" name="move_type">
              <el-form-item label="房屋类型" prop="type_id">
                <el-select v-model="moveForm.type_id" filterable placeholder="请选择房屋类型">
                  <el-option :value="item.id" :label="item.name" v-for="item in typeList" :key="item.id" />
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="房屋户型" name="move_layout">
              <el-form-item label="房屋户型" prop="layout_id">
                <el-select v-model="moveForm.layout_id" filterable placeholder="请选择房屋户型">
                  <el-option :value="item.id" :label="item.name" v-for="item in layoutList" :key="item.id" />
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
import detail from './compontens/detail.vue'
import follow from './compontens/follow.vue'
import { computed, reactive, ref, watch, onMounted } from 'vue'
import order from '@/api/order'
import { toast, showModal, showPrompt, parseTime, elLoading, closeElLoading } from '@/utils/utils'
import { useInitTable } from '@/hooks/useCommon'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Sortable from 'sortablejs'
import draggable from 'vuedraggable'
const router = useRouter()

const store = useStore()
const route = useRoute()
let tab = 'all'
let is__audit = null
let is__sign = null
let is__arrange = null
let is_renewal = null
let show_delete_time = ref(false)
if (route.query.is_audit) {
  is__audit = [parseInt(route.query.is_audit)]
}
if (route.query.is_sign) {
  is__sign = route.query.is_sign
  tab = 'sign'
}
if (route.query.is_arrange) {
  is__arrange = route.query.is_arrange
  tab = 'arrange'
}
if (route.query.is_renewal) {
  is_renewal = route.query.is_renewal
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
    region_id: '',
    arrange_type: '',
    channel_status: '',
    receive_company: null,
    order_time: '',
    order_time_start: '',
    order_time_end: '',
    province_id: '',
    city_id: '',
    channel_id: null,
    source_id: null,
    status_id: null,
    size: null,
    receive_man: null,
    layout_id: null,
    type_id: null,
    reason_id: null,
    arrange_time: '',
    arrange_time_start: '',
    arrange_time_end: '',
    deal_time: '',
    deal_time_start: '',
    deal_time_end: '',
    create_time: '',
    create_time_start: '',
    create_time_end: '',
    invalid_tag: null,
    is_audit: is__audit,
    is_renewal: is_renewal,
    is_visit: null,
    is_arrange: is__arrange,
    is_sign: is__sign,
    tab: tab,
  },
  onGetListSuccess: (res) => {
    count.value = res.result.total
    dataList.value = res.result.data.map((o) => {
      o.followLoading = false
      let order_time = o.order_time
      o.order_time = parseTime(order_time, '{y}-{m}-{d}')
      o.order_time_hi = parseTime(order_time, '{h}:{i}')
      o.order_time_mobile = parseTime(order_time, '{y}-{m}-{d} {h}:{i}')
      o.arrange_time = parseTime(o.arrange_time, '{y}-{m}-{d} {h}:{i}')
      o.deal_time = parseTime(o.deal_time, '{y}-{m}-{d} {h}:{i}')
      o.follow_time = parseTime(parseInt(o.follow_time), '{y}-{m}-{d} {h}:{i}')
      o.visit_time = parseTime(parseInt(o.visit_time), '{y}-{m}-{d} {h}:{i}')
      o.signing_time = parseTime(parseInt(o.signing_time), '{y}-{m}-{d} {h}:{i}')
      o.start_time = parseTime(parseInt(o.start_time), '{y}-{m}-{d} {h}:{i}')
      o.end_time = parseTime(parseInt(o.end_time), '{y}-{m}-{d} {h}:{i}')
      o.delete_time = parseTime(parseInt(o.delete_time), '{y}-{m}-{d} {h}:{i}')
      o.order_money = o.order_money == 0 ? '' : o.order_money
      o.contract_money = o.contract_money == 0 ? '' : o.contract_money
      // o.type = '投放'
      // if (o.channel_id == 172 || o.channel_id == 117 || o.channel_id == 167 || o.channel_id == 108 || o.channel_id == 152 || o.channel_id == 134 || o.channel_id == 119) {
      //   o.type = '电商'
      // }
      return o
    })
  },
})

// tab切换
const tabChange = () => {
  if (route.query.is_arrange && params.tab != 'arrange') {
    params.is_arrange = null
  }
  if (route.query.is_sign && params.tab != 'sign') {
    params.is_sign = null
  }
  if (params.tab == 'recyc') {
    show_delete_time.value = true
  } else {
    show_delete_time.value = false
  }
  getData(1)
}

// 搜索展示收起
const handleShowSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    // 返回页面顶部
    let elMain = document.querySelector('.el-main')
    elMain.scrollTop = 0
  }
}

// 动态列
let showColumns = []
// 所有展示的表头信息
const columns = ref([])

const columnDrop = () => {
  let oldLabel
  let newLabel
  let oldIndex
  let newIndex
  let count = 0
  let tableColumn = []
  const theadTr = document.querySelector('.el-table__header-wrapper tr')
  if (theadTr) {
    Sortable.create(theadTr, {
      draggable: '.drag',
      animation: 200,
      delay: 0,
      ghostClass: 'ghost',
      filter: '.el-table-column--selection,.el-table-fixed-column--right',
      onStart(event) {
        // console.log(columns.value)
      },
      onEnd(event) {
        if (columns.value[event.newIndex].isDrag != undefined) {
          // 改变两个列的id属性之后,表格的数据才进行跟新.因为v-for的key使用的是id值
          //当拖拽排序与显示隐藏一起使用会因为索引错误导致bug,主要原因是因为拖拽的是显示的列，而重排的是全部的列，同时event.oldIndex和event.newIndex是显示列拖拽的column的index  这个地方用splice方法重排所有的column的index  排序的时候就出现乱排、不排的现象
          //解决办法获得拖拽列的两个列的label  然后遍历全部的列  要是label相等的就返回全部列其中两个相等label列的下标  然后重排这两个列就行
          // let oldItem = columns.value.splice(event.oldIndex, 1)[0]
          // columns.value.splice(event.newIndex, 0, oldItem)
          // columns.value[event.oldIndex].id = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '1'
          // columns.value[event.newIndex].id = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '2'

          tableColumn = columns.value.filter((item) => item.show)

          oldLabel = tableColumn[event.oldIndex].label
          newLabel = tableColumn[event.newIndex].label
          for (let i = 0; i < columns.value.length; i++) {
            if (columns.value[i].label != undefined && columns.value[i].label == newLabel) newIndex = i
          }
          for (let i = 0; i < columns.value.length; i++) {
            if (columns.value[i].label != undefined && columns.value[i].label == oldLabel) oldIndex = i
          }
          let oldItem = columns.value.splice(oldIndex, 1)[0]
          columns.value.splice(newIndex, 0, oldItem)
          columns.value.forEach((item) => {
            if (item.label == newLabel || item.label == oldLabel) {
              item.id = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + ++count
            }
          })

          localStorage.setItem('order_columns', JSON.stringify(columns.value))
        }
      },
      // onUpdate: function (evt) {
      //   console.log(evt)
      //   var index = evt.oldIndex
      // },
    })
  }
}

const fliterChange = (val, index) => {}
onMounted(() => {
  // oldList.value = JSON.parse(JSON.stringify(columns.value)).filter((item) => item.show && !item.hide) //数据深拷贝
  if (localStorage.getItem('order_columns')) {
    columns.value = JSON.parse(localStorage.getItem('order_columns'))
  } else {
    if (store.state.adminInfo.branch_id == 1) {
      columns.value = [
        { id: 1, prop: 'id', label: 'ID', type: 'selection', sortable: false, minWidth: 55, show: true },
        { id: 41, prop: 'arrange_type', label: '派单类型', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        // { id: 41, prop: 'type', label: '类型', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        { id: 2, prop: 'channel_name', label: '渠道', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        { id: 3, prop: 'order_time', label: '下单日期', sortable: true, minWidth: 120, isDrag: 'drag', show: true },
        { id: 4, prop: 'order_time_hi', label: '下单时间', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        { id: 5, prop: 'source_name', label: '来源', scope: 'scope', sortable: false, minWidth: 130, isDrag: 'drag', show: true },
        { id: 6, prop: 'name', label: '姓名', sortable: false, minWidth: 110, isDrag: 'drag', show: true },
        { id: 7, prop: 'mobile', label: '电话', sortable: false, minWidth: 140, isDrag: 'drag', show: true },
        { id: 8, prop: 'is_audit', label: '审核状态', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 9, prop: 'area', label: '区域', sortable: false, minWidth: 150, isDrag: 'drag', show: true },
        { id: 10, prop: 'address', label: '详细地址', sortable: false, minWidth: 180, isDrag: 'drag', show: true },
        { id: 14, prop: 'size', label: '面积', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 15, prop: 'demand', label: '装修需求', isDrag: 'drag', sortable: false, minWidth: 140, show: true },
        { id: 16, prop: 'other', label: '其他', isDrag: 'drag', sortable: false, minWidth: 140, show: true },
        { id: 17, prop: 'arrange_time', label: '派单时间', sortable: true, minWidth: 150, isDrag: 'drag', show: true },
        { id: 18, prop: 'branch_name', label: '接单公司', sortable: false, minWidth: 140, isDrag: 'drag', show: true },
        { id: 20, prop: 'status_name', label: '订单状态', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 22, prop: 'deal_time', label: '反馈交定时间', sortable: true, minWidth: 150, isDrag: 'drag', show: true },
        { id: 24, prop: 'order_money', label: '定金金额', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 32, prop: 'follow_time', label: '最新跟进时间', sortable: true, minWidth: 140, isDrag: 'drag', show: true },
        { id: 33, prop: 'follow_note', label: '最新跟进进展', sortable: false, minWidth: 180, isDrag: 'drag', show: true },
        { id: 34, prop: 'invalid_tag', label: '无效标签', sortable: false, minWidth: 160, isDrag: 'drag', show: true },
        { id: 35, prop: 'is_visit', label: '客户回访', sortable: false, minWidth: 160, isDrag: 'drag', show: true },
        { id: 36, prop: 'visit_time', label: '最近回访时间', sortable: true, minWidth: 150, isDrag: 'drag', show: true },
        { id: 37, prop: 'visit_remark', label: '最近回访说明', sortable: false, minWidth: 160, isDrag: 'drag', show: true },
        { id: 11, prop: 'type_name', label: '房屋类型', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 12, prop: 'is_making', label: '是否交房', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 13, prop: 'layout_name', label: '房屋户型', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 19, prop: 'receive_man', label: '接单人', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 21, prop: 'reason_name', label: '死单原因', sortable: false, minWidth: 140, isDrag: 'drag', show: false },
        { id: 23, prop: 'designer', label: '设计师', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 25, prop: 'signing_time', label: '签约时间', sortable: false, minWidth: 140, isDrag: 'drag', show: false },
        { id: 26, prop: 'contract_money', label: '合同金额', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 27, prop: 'start_time', label: '开工时间', sortable: false, minWidth: 140, isDrag: 'drag', show: false },
        { id: 28, prop: 'end_time', label: '完工时间', sortable: false, minWidth: 140, isDrag: 'drag', show: false },
        { id: 29, prop: 'construction_manager', label: '施工经理', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 30, prop: 'quality_man', label: '质监', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 31, prop: 'is_amount', label: '是否量房', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 38, prop: 'user_name', label: '录入者', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 39, prop: 'create_time', label: '录入时间', sortable: false, minWidth: 160, isDrag: 'drag', show: false },
        { id: 39, prop: 'delete_time', label: '删除时间', sortable: false, minWidth: 160, isDrag: 'drag', show: show_delete_time },
        { id: 40, prop: 'operation', label: '操作', minWidth: 210, fixed: 'right', show: true },
      ]
    } else {
      columns.value = [
        { id: 1, prop: 'id', label: 'ID', type: 'selection', sortable: false, minWidth: 55, show: true },
        { id: 2, prop: 'type', label: '订单类型', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        { id: 41, prop: 'arrange_type', label: '派单类型', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        { id: 3, prop: 'order_time', label: '下单日期', sortable: true, minWidth: 120, isDrag: 'drag', show: true },
        { id: 4, prop: 'order_time_hi', label: '下单时间', sortable: false, minWidth: 100, isDrag: 'drag', show: true },
        { id: 6, prop: 'name', label: '姓名', sortable: false, minWidth: 110, isDrag: 'drag', show: true },
        { id: 7, prop: 'mobile', label: '电话', sortable: false, minWidth: 140, isDrag: 'drag', show: true },
        { id: 8, prop: 'is_audit', label: '审核状态', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 9, prop: 'area', label: '区域', sortable: false, minWidth: 150, isDrag: 'drag', show: true },
        { id: 10, prop: 'address', label: '详细地址', sortable: false, minWidth: 180, isDrag: 'drag', show: true },
        { id: 14, prop: 'size', label: '面积', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 15, prop: 'demand', label: '装修需求', sortable: false, minWidth: 140, isDrag: 'drag', show: true },
        { id: 42, prop: 'other', label: '其他', sortable: false, minWidth: 140, isDrag: 'drag', show: true },
        { id: 17, prop: 'arrange_time', label: '派单时间', sortable: true, minWidth: 150, isDrag: 'drag', show: true },
        { id: 18, prop: 'branch_name', label: '接单公司', sortable: false, minWidth: 140, isDrag: 'drag', show: true },
        { id: 20, prop: 'status_name', label: '订单状态', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 22, prop: 'deal_time', label: '反馈交定时间', sortable: true, minWidth: 150, isDrag: 'drag', show: true },
        { id: 24, prop: 'order_money', label: '定金金额', sortable: false, minWidth: 120, isDrag: 'drag', show: true },
        { id: 32, prop: 'follow_time', label: '最新跟进时间', sortable: true, minWidth: 140, isDrag: 'drag', show: true },
        { id: 33, prop: 'follow_note', label: '最新跟进进展', sortable: false, minWidth: 180, isDrag: 'drag', show: true },
        { id: 11, prop: 'type_name', label: '房屋类型', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 12, prop: 'is_making', label: '是否交房', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 13, prop: 'layout_name', label: '房屋户型', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 19, prop: 'receive_man', label: '接单人', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 23, prop: 'designer', label: '设计师', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 25, prop: 'signing_time', label: '签约时间', sortable: false, minWidth: 140, isDrag: 'drag', show: false },
        { id: 26, prop: 'contract_money', label: '合同金额', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 27, prop: 'start_time', label: '开工时间', sortable: false, minWidth: 140, isDrag: 'drag', show: false },
        { id: 28, prop: 'end_time', label: '完工时间', sortable: false, minWidth: 140, show: false },
        { id: 29, prop: 'construction_manager', label: '施工经理', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 30, prop: 'quality_man', label: '质监', sortable: false, minWidth: 120, isDrag: 'drag', show: false },
        { id: 31, prop: 'is_amount', label: '是否量房', sortable: false, minWidth: 100, isDrag: 'drag', show: false },
        { id: 40, prop: 'operation', label: '操作', minWidth: 150, fixed: 'right', show: true },
      ]
    }
  }
  columnDrop()
})
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
        form.order_money = form.order_money == 0 ? '' : form.order_money
        form.contract_money = form.contract_money == 0 ? '' : form.contract_money
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
  layout_id: '',
  type_id: '',
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
  moveForm.layout_id = ''
  moveForm.type_id = ''
}
const moveTabChange = () => {
  moveForm.channel_id = ''
  moveForm.source_id = ''
  moveForm.receive_company = ''
  moveForm.layout_id = ''
  moveForm.type_id = ''
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
  showPrompt('导出原因')
    .then((res) => {
      // 确认
      if (!res.value) {
        toast('请填写导出原因', 'error')
        return
      }
      params.export_remark = res.value
      //console.log(res.value)
      elLoading('数据导出中...')
      order
        .export(params)
        .then((res) => {
          if (res.code > 0) {
            showModal('数据导出成功，等管理员审核后前往"导出记录"页面下载')
              .then((res) => {
                // 确认
                router.push('/order/export')
              })
              .catch((e) => {
                // 取消
                //console.log(e)
                router.push('/order/export')
              })
            //location.href = res.result.url
          } else {
            toast(res.message || 'Error', 'error')
          }
        })
        .finally(() => {
          closeElLoading()
        })
    })
    .catch((e) => {
      console.log(e)
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
// 回访
const sizeList = [
  {
    key: '80以下',
    value: '1-79',
  },
  {
    key: '80-119',
    value: '80-119',
  },
  {
    key: '120-179',
    value: '120-179',
  },
  {
    key: '180-299',
    value: '180-299',
  },
  {
    key: '300-999',
    value: '300-999',
  },
  {
    key: '1000以上',
    value: '1000-1000000',
  },
]

const channelList = ref([])
const channel = ref([])
const areaList = ref([])
const province = ref([])
const branchList = ref([])
const statusList = ref([])
const regionList = ref([])
const status = ref([])
const reasonList = ref([])
const layoutList = ref([])
const typeList = ref([])
const tag = ref([])
const branch = ref([])
const arrangeType = [
  {
    id: 1,
    name: '客服派单',
  },
  {
    id: 2,
    name: '系统派单',
  },
]
// 渠道类型
const channeStatuslList = ref([
  { id: 1, name: '网销' },
  { id: 2, name: '策划' },
  { id: 3, name: '矩阵' },
])
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

// 测试对接人openid
const checkOpenid = () => {
  order.getOpenid().then((res) => {
    console.log(res)
  })
}

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
      reasonList.value = res.result.reason
      typeList.value = res.result.type
      layoutList.value = res.result.layout
      tag.value = res.result.tag
      tag.value.push({ id: 100, name: '其他' })
      statusList.value = res.result.status
      regionList.value = res.result.region
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
  params.region_id = ''
  params.arrange_type = ''
  params.channel_status = ''
  params.order_time = ''
  params.order_time_start = ''
  params.order_time_end = ''
  params.create_time = ''
  params.create_time_start = ''
  params.create_time_end = ''
  params.province_id = ''
  params.city_id = ''
  params.channel_id = null
  params.source_id = null
  params.status_id = null
  params.reason_id = null
  params.arrange_time = ''
  params.arrange_time_start = ''
  params.arrange_time_end = ''
  params.deal_time = ''
  params.deal_time_start = ''
  params.deal_time_end = ''
  params.invalid_tag = null
  params.is_audit = null
  params.is_visit = null
  params.size = null
  params.receive_man = null
  params.type_id = null
  params.layout_id = null
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
        res.result.order_money = res.result.order_money == 0 ? '' : res.result.order_money
        res.result.contract_money = res.result.contract_money == 0 ? '' : res.result.contract_money
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

const followRef = ref('')
const handleFollow = (row) => {
  row.followLoading = true
  followRef.value.openFollowDrawer(row.id)
}

const closeFollow = (val) => {
  dataList.value.map((item) => (item.followLoading = false))
  if (val) {
    getData()
  }
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
        //获取通知消息
        store.dispatch('getNote')
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
.el-table td.el-table__cell div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
:deep(.el-form--label-left .el-form-item__label),
:deep(.el-form--default.el-form--label-top .el-form-item .el-form-item__label) {
  font-weight: 700 !important;
}
</style>
