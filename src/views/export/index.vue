<template>
  <div class="app-container">
    <el-card class="admin-card" shadow="hover" style="margin-bottom: 15px" v-permission="81">
      <div class="title">订单导出</div>
      <el-form class="search-more" :model="searchParams" ref="searchMoreRef" label-width="68px" :label-position="$store.state.isMobile ? 'top' : 'left'">
        <template v-if="$store.state.adminInfo.branch_id == 1">
          <el-row :gutter="20">
            <el-col :md="6" :offset="0">
              <el-form-item label="下单时间">
                <template v-if="!$store.state.isMobile">
                  <el-date-picker
                    style="width: 45%"
                    v-model="searchParams.order_time"
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
                    v-model="searchParams.order_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.order_time_end"
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
                <el-select v-model="searchParams.channel_id" placeholder="选择或搜索渠道" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in channel" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="客户来源">
                <el-select v-model="searchParams.source_id" placeholder="选择或搜索来源" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                  <el-option-group v-for="group in source" :key="group.label" :label="group.label">
                    <el-option :value="item.id" :label="item.name" v-for="item in group.options" :key="item.id"></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="手机号">
                <el-input v-model="searchParams.mobile" placeholder="输入客户电话" clearable @clear="getData(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="6" :offset="0">
              <el-form-item label="派单时间">
                <template v-if="!$store.state.isMobile">
                  <el-date-picker
                    style="width: 45%"
                    v-model="searchParams.arrange_time"
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
                    v-model="searchParams.arrange_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.arrange_time_end"
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
                <el-select v-model="searchParams.province_id" filterable placeholder="选择或搜索省" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.areaname" v-for="item in province" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
              <el-form-item label="所在市">
                <el-select v-model="searchParams.city_id" placeholder="选择或搜索城市" filterable clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.areaname" v-for="item in city" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="接单公司">
                <el-select
                  v-model="searchParams.receive_company"
                  placeholder="选择或搜索公司"
                  clearable
                  multiple
                  collapse-tags
                  :max-collapse-tags="3"
                  collapse-tags-tooltip
                  filterable
                  @clear="getData(1)"
                >
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
                    v-model="searchParams.deal_time"
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
                    v-model="searchParams.deal_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.deal_time_end"
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
                <el-select v-model="searchParams.status_id" multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip placeholder="选择状态" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in status" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="审核状态">
                <el-select v-model="searchParams.is_audit" multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip placeholder="选择状态" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
              <el-form-item label="无效标签">
                <el-select v-model="searchParams.invalid_tag" placeholder="选择标签" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
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
                    v-model="searchParams.create_time"
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
                    v-model="searchParams.create_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.create_time_end"
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
                <el-select v-model="searchParams.region_id" placeholder="选择一级区域" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in regionList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
              <el-form-item label="客户回访">
                <el-select v-model="searchParams.is_visit" placeholder="请选择" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in visit" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :md="6" :offset="0" v-if="!$store.state.isMobile">
                <el-form-item label="客户名称">
                  <el-input v-model="searchParams.name" placeholder="输入客户名称" clearable
                    @clear="getData(1)">
                  </el-input>
                </el-form-item>
              </el-col> -->
            <el-col :md="6" :offset="0">
              <el-form-item label="死单标签">
                <el-select v-model="searchParams.reason_id" multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip placeholder="选择标签" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in reasonList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="6" :offset="0">
              <el-form-item label="房屋面积">
                <el-select v-model="searchParams.size" placeholder="选择面积" clearable @clear="getData(1)">
                  <el-option :value="item.value" :label="item.key" v-for="item in sizeList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="房屋类型">
                <el-select v-model="searchParams.type_id" placeholder="选择类型" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in typeList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="房屋户型">
                <el-select v-model="searchParams.layout_id" placeholder="选择户型" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in layoutList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="派单类型">
                <el-select v-model="searchParams.arrange_type" placeholder="选择派单类型" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in arrangeType" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="6" :offset="0">
              <el-form-item label="渠道类型">
                <el-select v-model="searchParams.channel_status" placeholder="选择渠道类型" clearable collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in channeStatuslList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" :offset="0">
              <el-form-item label="导出字段">
                <el-checkbox-group v-model="searchParams.columns" class="export-columns-group">
                  <el-checkbox v-for="item in exportColumns" :key="item.value" :label="item.value" class="export-column-checkbox">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" :offset="0">
              <el-form-item label="导出原因">
                <el-input v-model="searchParams.export_remark" placeholder="输入导出原因" clearable @clear="getData(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row :gutter="20">
            <el-col :md="6" :offset="0">
              <el-form-item label="客户名称">
                <el-input v-model="searchParams.name" placeholder="输入客户名称" clearable @clear="getData(1)"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="手机号">
                <el-input v-model="searchParams.mobile" placeholder="输入客户电话" clearable @clear="getData(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="下单时间">
                <template v-if="!$store.state.isMobile">
                  <el-date-picker
                    style="width: 45%"
                    v-model="searchParams.order_time"
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
                    v-model="searchParams.order_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.order_time_end"
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
                    v-model="searchParams.arrange_time"
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
                    v-model="searchParams.arrange_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.arrange_time_end"
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
                    v-model="searchParams.deal_time"
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
                    v-model="searchParams.deal_time_start"
                    type="datetime"
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :editable="false"
                    clearable
                  />
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchParams.deal_time_end"
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
                <el-select v-model="searchParams.is_audit" multiple placeholder="选择状态" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in audit" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="订单状态">
                <el-select v-model="searchParams.status_id" multiple placeholder="选择状态" clearable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in status" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="接单公司">
                <el-select v-model="searchParams.receive_company" placeholder="选择或搜索公司" clearable multiple filterable @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in branch" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="6" :offset="0">
              <el-form-item label="派单类型">
                <el-select v-model="searchParams.arrange_type" placeholder="选择派单类型" clearable multiple collapse-tags :max-collapse-tags="3" collapse-tags-tooltip @clear="getData(1)">
                  <el-option :value="item.id" :label="item.name" v-for="item in arrangeType" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="房屋面积">
                <el-select v-model="searchParams.size" placeholder="选择面积" clearable @clear="getData(1)">
                  <el-option :value="item.value" :label="item.key" v-for="item in sizeList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :offset="0">
              <el-form-item label="接单人">
                <el-input v-model="searchParams.receive_man" placeholder="输入接单人名称" clearable @clear="getData(1)"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" :offset="0">
              <el-form-item label="导出字段">
                <el-checkbox-group v-model="searchParams.columns" class="export-columns-group">
                  <template v-for="item in exportColumns" :key="item.value">
                    <el-checkbox
                      v-if="!['channel_id', 'source_id', 'remark', 'ip', 'link', 'is_visit', 'visit_time', 'visit_remark', 'invalid_tag', 'add_user', 'create_time'].includes(item.value)"
                      :label="item.value"
                      class="export-column-checkbox"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" :offset="0">
              <el-form-item label="导出原因">
                <el-input v-model="searchParams.export_remark" placeholder="输入导出原因" clearable @clear="getData(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-row :gutter="2">
          <el-col :span="24" :offset="0">
            <el-form-item label="">
              <el-button type="primary" @click="exportData">导出</el-button>
              <el-button @click="resetSearchForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="admin-card" shadow="hover">
      <div class="title">历史导出记录</div>
      <!-- <el-form class="search-more" :model="params" ref="searchMoreRef" size="default" label-width="68px" v-if="showSearch" :label-position="$store.state.isMobile ? 'top' : 'left'">
        <el-row :gutter="20">
          <el-col :md="6" :offset="0">
            <el-form-item label="用户">
              <el-input v-model="params.name" placeholder="输入用户名称" clearable @clear="getData"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :offset="0">
            <el-form-item label="公司">
              <el-select v-model="params.export_branch_id" filterable placeholder="选择或搜索公司" clearable @clear="getData(1)">
                <el-option :value="item.id" :label="item.name" v-for="item in branch" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :offset="0">
            <el-form-item label="审核状态">
              <el-select v-model="params.export_status" placeholder="选择审核状态" clearable @clear="getData(1)">
                <el-option value="1" label="待审核"></el-option>
                <el-option value="2" label="审核通过"></el-option>
                <el-option value="3" label="审核未通过"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :offset="0">
            <el-form-item label="导出时间">
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
      <ListHeader ref="headerRef" action="https://api.xydec.com.cn/order/branch/import" :rule="{ export: 155 }" @export="exportExcel">
        <el-form class="search-form" :model="params" ref="searchRef" label-width="0px" size="default">
          <el-form-item label="" v-show="!showSearch && !$store.state.isMobile">
            <el-input v-model="params.name" placeholder="输入用户名" clearable @clear="getData(1)"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!showSearch && !$store.state.isMobile" type="primary" @click="getData(1)">搜索</el-button>
            <el-button v-permission="66" type="primary" text @click="showSearch = !showSearch">
              {{ showSearch ? '收起' : '展开搜索' }}
              <el-icon>
                <ArrowUp v-if="showSearch" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-form>
      </ListHeader> -->
      <el-table
        ref="multipleTableRef"
        :data="dataList"
        stripe
        style="width: 100%"
        tooltip-effect="light"
        :header-cell-style="{ color: '#2c3e50', backgroundColor: '#f2f2f2' }"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" prop="id" width="55" />
        <el-table-column prop="export_admin_name" label="用户名" show-overflow-tooltip width="150" />
        <el-table-column prop="export_branch_name" show-overflow-tooltip label="公司" width="150" />
        <el-table-column prop="create_time" label="导出时间" width="180" />
        <el-table-column prop="export_total_num" label="导出订单数" width="150" />
        <el-table-column prop="export_remark" label="导出原因" width="200" />
        <el-table-column prop="status" width="160" label="审核状态">
          <template #default="scope">
            <el-tag size="small" type="warning" v-if="scope.row.export_status == 1">待审核</el-tag>
            <el-tag size="small" type="success" v-if="scope.row.export_status == 2">审核通过</el-tag>
            <el-tag size="small" type="danger" v-if="scope.row.export_status == 3">审核未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="docking_man" show-overflow-tooltip label="公司对接人" width="150" />
        <el-table-column prop="docking_phone" show-overflow-tooltip label="公司对接人电话" width="150" />
        <el-table-column prop="respon_man" show-overflow-tooltip label="公司负责人" width="150" />
        <el-table-column prop="respon_phone" show-overflow-tooltip label="公司负责人电话" width="150" />
        <!-- <el-table-column prop="examine_time" show-overflow-tooltip label="审核时间" width="180" />
        <el-table-column prop="examine_admin_name" show-overflow-tooltip label="审核人" width="150" /> -->
        <el-table-column label="操作" fixed="right" min-width="200">
          <template #default="scope">
            <el-button v-if="params.tab !== 'recyc'" v-permission="153" size="small" type="success" @click="handleDetail(scope.row.id)">详情 </el-button>
            <el-button v-permission="154" :disabled="scope.row.export_status != 1 && scope.row.export_status != 3" size="small" type="primary" @click="handleExamine(scope.row)"> 审核 </el-button>
            <el-button v-permission="156" size="small" type="danger" :disabled="!scope.row.export_allow" @click="handleDown(scope.row)"> 下载 </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="examine_remark" label="审核意见" width="100" /> -->
      </el-table>
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 15, 50, 100, 200]"
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
    <detail ref="detailRef" :detail="details" />
    <el-dialog
      class="diaolog-form"
      v-model="showFormDialog"
      title="导出记录审核"
      :width="$store.state.isMobile ? '90%' : 600"
      :destroy-on-close="true"
      @closed="dialogClosed"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="formRef" :rules="rules" label-width="140px" :label-position="$store.state.isMobile ? 'top' : 'right'">
        <!-- <el-form-item label="用户名" prop="export_admin_id">
          <el-input minlength="2" maxlength="20" show-word-limit v-model="form.export_admin_id"
            disabled></el-input>
        </el-form-item> -->
        <el-form-item label="审核意见">
          <el-radio-group v-model="form.export_status">
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showFormDialog = false">取消</el-button>
          <el-button style="margin-left: 15px" type="primary" @click="submitExamine" :loading="loading"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
// import ListHeader from '@/components/ListHeader.vue'
import exports from '@/api/exports'
import order from '@/api/order'
import { toast, elLoading, closeElLoading } from '@/utils/utils'
import detail from './compontens/detail.vue'
import { useInitTable, useInitForm } from '@/hooks/useCommon'
import { useStore } from 'vuex'
const { loading, count, dataList, params, getData, handleCurrentChange, handleSizeChange, sortChange, handleDelete, handleSelectionChange, multipleTableRef, handleMultiDelete } = useInitTable({
  api: exports,
  params: {
    page: 1,
    pageSize: 15,
    name: '',
    export_status: '',
    export_branch_id: '',
    create_time: '',
  },
  onGetListSuccess: (res) => {
    dataList.value = res.result.data.map((o) => {
      count.value = res.result.total
      o.export_allow = false
      // if (o.export_num == 0 && o.export_status == 2) o.export_allow = true
      if (o.export_num <= 10 && o.export_status == 2) o.export_allow = true
      return o
    })
  },
})

const store = useStore()
const showSearch = ref(false) // 高级搜索
const searchMoreRef = ref()
const { formDialogRef, formRef, rules, form, handleSubmit } = useInitForm({
  api: exports,
  getData,
  form: {
    export_status: 2,
  },
  rules: {},
  fliterParam(row) {
    if (row.export_status != 1) {
      form.export_status = row.export_status
    }
  },
})

const branch = ref([])

// // select数据,合并远程请求
exports.getSelect().then((res) => {
  if (res.code > 0) {
    branch.value = res.result.branch
  } else {
    toast(res.message || 'Error', 'error')
  }
})

// 表单重置
const resetFrom = () => {
  if (!searchMoreRef.value) return
  // searchMoreRef.value.resetFields()
  params.page = 1
  params.pageSize = 15
  params.name = ''
  params.export_status = ''
  params.export_branch_id = ''
  params.create_time = ''
  getData(1)
}

// 导出
const exportExcel = () => {
  elLoading('数据导出中...')
  exports
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
// 审核
const export_id = ref(0)
const showFormDialog = ref(false)
const handleExamine = (row) => {
  export_id.value = row.id
  if (row.export_status != 1) form.export_status = row.export_status
  showFormDialog.value = true
}
// 审核提交
const submitExamine = () => {
  exports
    .examine(export_id.value, form)
    .then((res) => {
      if (res.code > 0) {
        toast('数据操作成功')
        showFormDialog.value = false
        getData()
      } else {
        toast(res.message || 'Error', 'error')
      }
    })
    .finally(() => {
      //showFormDialog.value = false
    })
}
const dialogClosed = () => {
  form.export_status = 2
  export_id.value = 0
  showFormDialog.value = false
}
const handleDown = (row) => {
  row.export_allow = false
  //location.href = row.export_url
  // 累积下载次数
  exports.down({ id: row.id }).then((res) => {
    if (res.code > 0) {
      toast('文件下载成功')
      location.href = row.export_url
    } else {
      toast(res.message || 'Error', 'error')
    }
  })
}
const detailRef = ref(null)
const details = ref(null)
// 详情
const handleDetail = (id) => {
  exports
    .read(id)
    .then((res) => {
      if (res.code > 0) {
        //res.result.arrange_time = parseTime(res.result.arrange_time)
        //res.result.order_money = res.result.order_money == 0 ? '' : res.result.order_money
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
const searchParams = reactive({
  tab: 'all',
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
  export_remark: '',
  is_audit: null,
  create_time: '',
  add_user: '',
  columns: ['order_time', 'channel_id', 'source_id', 'mobile', 'area', 'address', 'arrange_time', 'receive_company', 'deal_time', 'status_id'],
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
// 面积
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

// 导出字段选项
const exportColumns = [
  { value: 'id', label: '订单id' },
  { value: 'order_type', label: '订单类型' },
  { value: 'is_audit', label: '审核状态' },
  { value: 'fail_reason', label: '审核失败原因' },
  { value: 'order_time', label: '下单时间' },
  { value: 'channel_id', label: '渠道' },
  { value: 'source_id', label: '来源' },
  { value: 'name', label: '客户姓名' },
  { value: 'mobile', label: '联系方式' },
  { value: 'area', label: '区域' },
  { value: 'address', label: '详细地址' },
  { value: 'is_making', label: '是否交房' },
  { value: 'type_id', label: '房屋类型' },
  { value: 'layout_id', label: '房屋户型' },
  { value: 'size', label: '房屋面积' },
  { value: 'demand', label: '装修需求' },
  { value: 'other', label: '其他' },
  { value: 'ip', label: '客户ip' },
  { value: 'link', label: '下单页面' },
  { value: 'remark', label: '推广标识' },
  { value: 'arrange_time', label: '派单时间' },
  { value: 'receive_company', label: '派单公司' },
  { value: 'receive_man', label: '接单人' },
  { value: 'deal_time', label: '反馈交定时间' },
  { value: 'status_id', label: '订单状态' },
  { value: 'order_money', label: '订单金额(元)' },
  { value: 'designer', label: '设计师' },
  { value: 'signing_time', label: '签约时间' },
  { value: 'contract_money', label: '合同金额(元)' },
  { value: 'start_time', label: '开工时间' },
  { value: 'end_time', label: '完工时间' },
  { value: 'construction_manager', label: '施工经理' },
  { value: 'quality_man', label: '质监' },
  { value: 'is_amount', label: '是否量房' },
  { value: 'follow_time', label: '最近反馈时间' },
  { value: 'follow_note', label: '最近反馈说明' },
  { value: 'is_visit', label: '客户回访' },
  { value: 'visit_time', label: '最近回访时间' },
  { value: 'visit_remark', label: '最近回访说明' },
  { value: 'invalid_tag', label: '无效标签' },
  { value: 'reason_id', label: '死单标签' },
  { value: 'add_user', label: '录入者' },
  { value: 'create_time', label: '录入时间' },
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
// const branch = ref([])
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
  searchParams.source_id = ''
  if (searchParams.channel_id) {
    let source = []
    channelList.value.forEach((item) => {
      if (searchParams.channel_id.includes(item.id)) {
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
  searchParams.city_id = ''
  if (searchParams.province_id) {
    let city = []
    try {
      areaList.value.forEach((item) => {
        if (item.id === searchParams.province_id) {
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
watch([() => searchParams.province_id, () => searchParams.city_id], (newValue, oldValue) => {
  searchParams.receive_company = ''
  if (newValue[1]) {
    branch.value = branchList.value.filter((o) => o.city_id === newValue[1])
  } else if (newValue[0]) {
    branch.value = branchList.value.filter((o) => o.province_id === newValue[0])
  } else {
    branch.value = branchList.value
  }
})

// 表单重置
const resetSearchForm = () => {
  if (!searchMoreRef.value) return
  // searchMoreRef.value.resetFields()
  searchParams.name = ''
  searchParams.mobile = ''
  searchParams.receive_company = null
  searchParams.region_id = ''
  searchParams.arrange_type = ''
  searchParams.channel_status = ''
  searchParams.order_time = ''
  searchParams.order_time_start = ''
  searchParams.order_time_end = ''
  searchParams.create_time = ''
  searchParams.create_time_start = ''
  searchParams.create_time_end = ''
  searchParams.province_id = ''
  searchParams.city_id = ''
  searchParams.channel_id = null
  searchParams.source_id = null
  searchParams.status_id = null
  searchParams.reason_id = null
  searchParams.arrange_time = ''
  searchParams.arrange_time_start = ''
  searchParams.arrange_time_end = ''
  searchParams.deal_time = ''
  searchParams.deal_time_start = ''
  searchParams.deal_time_end = ''
  searchParams.invalid_tag = null
  searchParams.is_audit = null
  searchParams.is_visit = null
  searchParams.size = null
  searchParams.receive_man = null
  searchParams.type_id = null
  searchParams.layout_id = null
  searchParams.export_remark = ''
  searchParams.columns = ['order_time', 'channel_id', 'source_id', 'mobile', 'area', 'address', 'arrange_time', 'receive_company', 'deal_time', 'status_id']
}

const exportData = () => {
  if (!searchParams.export_remark) {
    toast('请输入导出原因', 'error')
    return
  }
  elLoading('数据查询中...')
  exports
    .exportOrder(searchParams)
    .then((res) => {
      if (res.code > 0) {
        toast('导出成功,请等待管理员审核')
        getData()
      } else {
        toast(res.message || 'Error', 'error')
      }
    })
    .finally(() => {
      closeElLoading()
    })
}
</script>
<style lang="scss" scoped>
.search-more {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
.title {
  font-size: 16px;
  margin-bottom: 20px;
}
:deep(.el-form-item__label) {
  font-weight: 500 !important;
}
.export-columns-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.export-column-checkbox {
  min-width: 120px;
  text-align: left;
  margin-right: 10px;
}
</style>
