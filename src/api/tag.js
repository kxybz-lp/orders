/**
 * tag模块接口列表
 */
import { get, post } from '@/utils/http'

const tag = {
  // 列表
  getList(params) {
    return get('/order/tag/index', params)
  },
  // 新增
  create(params) {
    return post('/order/tag/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/tag/edit/${id}`, params)
  },
  // 状态更新
  status(params) {
    return post('/order/tag/status', params)
  },
  // 排序
  sort(params) {
    return post('/order/tag/sort', params)
  },
  // 删除
  delete(id) {
    return post(`/order/tag/delete/${id}`)
  },
}

export default tag
