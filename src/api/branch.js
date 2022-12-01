/**
 * branch模块接口列表
 */
import { get, post } from '@/utils/http'

const branch = {
  // 列表
  getList(params) {
    return get('/order/branch/index', params)
  },
  // select数据
  getSelect() {
    return get('/order/branch/getSelectData')
  },
  // 新增
  create(params) {
    return post('/order/branch/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/branch/edit/${id}`, params)
  },
  // 导出
  export(params) {
    return post('/order/branch/export', params)
  },
  // 导入
  import(params) {
    return post('/order/branch/import', params)
  },
  // 删除
  delete(id) {
    return post(`/order/branch/delete/${id}`)
  },
}

export default branch
