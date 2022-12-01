/**
 * notice模块接口列表
 */
import { get, post } from '@/utils/http'

const notice = {
  // 列表
  getList(params) {
    return get('/order/notice/index', params)
  },
  // 新增
  create(params) {
    return post('/order/notice/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/notice/edit/${id}`, params)
  },
  // 状态更新
  status(id, params) {
    return post(`/order/notice/status/${id}`, params)
  },
  // 排序
  sort(params) {
    return post('/order/notice/list_order', params)
  },
  // 删除
  delete(id) {
    return post(`/order/notice/delete/${id}`)
  },
}

export default notice
