/**
 * log模块接口列表
 */
import { get, post } from '@/utils/http'

const log = {
  // 列表
  getList(params) {
    return get('/order/log/index', params)
  },
  // 删除
  delete(id) {
    return post(`/order/log/delete/`, { id })
  },
  // 批量删除
  deleteAll(ids) {
    ids = !Array.isArray(ids) ? [ids] : ids
    return post('/order/log/delete', { id: ids })
  },
}

export default log
