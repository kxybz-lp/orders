/**
 * menu模块接口列表
 */
import { get, post } from '@/utils/http'

const menu = {
  // 列表
  getList(params) {
    return get('/order/menu/index', params)
  },
  // 新增
  create(params) {
    return post('/order/menu/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/menu/edit/${id}`, params)
  },
  // 状态更新
  status(id, params) {
    return post(`/order/menu/status/${id}`, params)
  },
  // 删除
  delete(id) {
    return post(`/order/menu/delete/${id}`)
  },
}

export default menu
