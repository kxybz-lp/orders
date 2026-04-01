/**
 * areas模块接口列表
 */
import { get, post } from '@/utils/http'

const areas = {
  // 列表
  getList(params) {
    return get('/order/areas/index', params)
  },
  // 新增
  create(params) {
    return post('/order/areas/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/areas/edit/${id}`, params)
  },
  // 状态更新
  status(params) {
    return post('/order/areas/status', params)
  },
  // 排序
  sort(params) {
    return post('/order/areas/sort', params)
  },
  // 删除
  delete(id) {
    return post(`/order/areas/delete/${id}`)
  },
}

export default areas
