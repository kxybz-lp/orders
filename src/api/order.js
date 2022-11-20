/**
 * article模块接口列表
 */
import { get, post } from '@/utils/http'

const order = {
  // 列表
  getList(params) {
    return get('/order/order/index', params)
  },
  // select数据
  getSelect() {
    return post('/order/order/getSelectData')
  },
  // 新增
  create(params) {
    return post('/order/order/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/order/edit/${id}`, params)
  },
  // 状态更新
  status(id, params) {
    return post(`/order/order/status/${id}`, params)
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
  // 数据硬删除
  del(id) {
    return post('/order/order/del', { id })
  },
}

export default order
