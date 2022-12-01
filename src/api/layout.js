/**
 * layout模块接口列表
 */
import { get, post } from '@/utils/http'

const layout = {
  // 列表
  getList(params) {
    return get('/order/layout/index', params)
  },
  // 新增
  create(params) {
    return post('/order/layout/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/layout/edit/${id}`, params)
  },
  // 状态更新
  status(id, params) {
    return post(`/order/layout/status/${id}`, params)
  },
  // 排序
  sort(params) {
    return post('/order/layout/list_order', params)
  },
  // 删除
  delete(id) {
    return post(`/order/layout/delete/${id}`)
  },
}

export default layout
