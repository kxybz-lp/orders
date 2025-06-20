/**
 * sms_customer模块接口列表
 */
import { get, post } from '@/utils/http'

const sms_customer = {
  // 列表
  getList(params) {
    return get('/order/sms_customer/index', params)
  },
  // 新增
  create(params) {
    return post('/order/sms_customer/create', params)
  },
  // 删除
  delete(id) {
    return post(`/order/sms_customer/delete/`, { id })
  },
  // 批量删除
  deleteAll(ids) {
    ids = !Array.isArray(ids) ? [ids] : ids
    return post('/order/sms_customer/delete', { id: ids })
  },
}

export default sms_customer
