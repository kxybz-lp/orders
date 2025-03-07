/**
 * admin模块接口列表
 */
import { get, post } from '@/utils/http'

const exports = {
  // 列表
  getList(params) {
    return get('/order/export/index', params)
  },
  // 详情
  read(id) {
    return post(`/order/export/read/${id}`)
  },
  // select数据
  getSelect() {
    return post('/order/export/getSelectData')
  },
  // 审核
  examine(id, params) {
    return post(`/order/export/examine/${id}`, params)
  },
  // 下载
  down(params) {
    return post(`/order/export/down`, params)
  },
  // 删除
  delete(id) {
    id = !Array.isArray(id) ? [id] : id
    return post(`/order/export/delete/${id}`)
  },
}

export default exports
