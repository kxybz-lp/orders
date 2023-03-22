/**
 * reason模块接口列表
 */
import { get, post } from '@/utils/http'

const reason = {
  // 列表
  getList(params) {
    return get('/order/reason/index', params)
  },
  // 新增
  create(params) {
    return post('/order/reason/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/reason/edit/${id}`, params)
  },
  // 状态更新
  status(params) {
    return post('/order/reason/status', params)
  },
  // 排序
  sort(params) {
    return post('/order/reason/sort', params)
  },
  // 删除
  delete(id) {
    return post(`/order/reason/delete/${id}`)
  },
}

export default reason
