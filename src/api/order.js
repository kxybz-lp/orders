/**
 * article模块接口列表
 */
import { get, post } from '@/utils/http'

const order = {
  // 列表
  getList(params) {
    return get('/order/order/index', params)
  },
  // 渠道签单详情
  getChannelDetail(params) {
    return get('/order/order/getChannelDetail', params)
  },
  // 渠道签单详情
  getStateDetail(params) {
    return get('/order/order/getStateDetail', params)
  },
  // select数据
  getSelect() {
    return get('/order/order/getSelectData')
  },
  // select数据
  getOpenid() {
    return get('/order/order/getOpenidByStore')
  },
  // 订单状态数据
  getStatus() {
    return get('/order/order/getStatusData')
  },
  // 死单标签数据
  getReason() {
    return get('/order/order/getReasonData')
  },
  // 新增
  create(params) {
    return post('/order/order/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/order/edit/${id}`, params)
  },
  // 跟进
  follow(id, params) {
    return post(`/order/order/follow/${id}`, params)
  },
  // 详情
  read(id) {
    return post(`/order/order/read/${id}`)
  },
  // 获取公司对接人
  getDockingMan(params) {
    return post('/order/order/getDockingMan', params)
  },
  // 删除
  delete(id) {
    id = !Array.isArray(id) ? [id] : id
    return post(`/order/order/delete/${id}`)
  },
  // 数据恢复
  resave(id) {
    return post('/order/order/resave', { id })
  },
  // 导出
  export(params) {
    return post('/order/order/export', params)
  },
  // 导出-新增审核记录
  export_examine(params) {
    return post('/order/order/export_examine', params)
  },
  // 导出号码重复的数据
  export_repeat(params) {
    return post('/order/order/export_repeat', params)
  },
  // 导入
  import(params) {
    return post('/order/order/import', params)
  },
  // 移动
  move(params) {
    return post('/order/order/move', params)
  },
  // 统计
  getAnalysis(params) {
    return post('/order/order/analysis', params)
  },
  // 数据硬删除
  del(id) {
    return post('/order/order/del', { id })
  },
}

export default order
