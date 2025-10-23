/**
 * brand_order模块接口列表
 */
import { get, post } from '@/utils/http'

const brand_order = {
  // 列表
  getList(params) {
    return get('/order/brand_order/index', params)
  },
  // select数据
  getSelect() {
    return get('/order/brand_order/getSelectData')
  },
  // 状态更新
  status(params) {
    return post('/order/brand_order/status', params)
  },
  // 详情
  read(id) {
    return post(`/order/brand_order/read/${id}`)
  },
  // 删除
  delete(id) {
    id = !Array.isArray(id) ? [id] : id
    return post(`/order/brand_order/delete/${id}`)
  },
  // 导出
  export(params) {
    return post('/order/brand_order/export', params)
  },
}

export default brand_order
