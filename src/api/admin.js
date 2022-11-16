/**
 * admin模块接口列表
 */
import { get, post } from '@/utils/http'

const admin = {
  // 列表
  getList(params) {
    return get('/order/admin/index', params)
  },
  // 登录
  login(params) {
    return post('/order/account/login', params)
  },
  // 查询个人信息
  getInfo() {
    return post('/order/admin/getInfo')
  },
  // 退出
  logout() {
    return post('/order/account/logout')
  },
  // 修改密码
  password(params) {
    return post('/order/admin/password', params)
  },
  // select数据
  getSelect() {
    return post('/order/admin/getSelectData')
  },
  // 修改密码
  password(params) {
    return post('/order/admin/password', params)
  },
  // 新增
  create(params) {
    return post('/order/admin/create', params)
  },
  // 更新
  edit(id, params) {
    return post(`/order/admin/edit/${id}`, params)
  },
  // 状态更新
  status(id, params) {
    return post(`/order/admin/status/${id}`, params)
  },
  // 删除
  delete(id) {
    return post(`/order/admin/delete/${id}`)
  },
}

export default admin
