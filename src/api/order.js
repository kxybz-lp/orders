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
  // 详情
  read(id) {
    return post(`/order/order/read/${id}`)
  },
  // 获取公司对接人
  getDockingMan(params) {
    return post('/order/order/getDockingMan', params)
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
  // 导出
  export(params) {
    return post('/order/order/export', params)
  },
  // 导入
  import(params) {
    return post('/order/order/import', params)
  },
  // 移动
  move(params) {
    return post('/order/order/move', params)
  },
  // 统计
  getAnalysis(params) {
    return post('/order/order/analysis', params)
  },
  // 数据硬删除
  del(id) {
    return post('/order/order/del', { id })
  },
}

export default order
