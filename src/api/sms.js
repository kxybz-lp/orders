/**
 * sms模块接口列表
 */
import { get, post } from '@/utils/http'

const sms = {
  // 列表
  getList(params) {
    return get('/order/sms/index', params)
  },
  // 删除
  delete(id) {
    return post(`/order/sms/delete/`, { id })
  },
  // 批量删除
  deleteAll(ids) {
    ids = !Array.isArray(ids) ? [ids] : ids
    return post('/order/sms/delete', { id: ids })
  },
}

export default sms
