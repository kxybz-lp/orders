/**
 * platform模块接口列表
 */
import { get, post } from '@/utils/http'

const platform = {
  // 列表
  getList(params) {
    return get('/order/platform/index', params)
  },
   // select数据
  getSelect() {
    return post('/order/platform/getSelectData')
  },
  // 新增
  create(params) {
    return post('/order/platform/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/platform/edit/${id}`, params)
  },
  // 状态更新
  status(params) {
    return post('/order/platform/status', params)
  },
  // 排序
  sort(params) {
    return post('/order/platform/sort', params)
  },
  // 删除
  delete(id) {
    return post(`/order/platform/delete/${id}`)
  },
}

export default platform
