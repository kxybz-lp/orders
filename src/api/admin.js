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
  // 绑定微信
  wechat() {
    return post('/order/admin/wechat')
  },
  // 微信绑定检测
  wechatCheck() {
    return post('/order/admin/check_bind')
  },
  // 微信绑定解除
  wechatRemove() {
    return post('/order/admin/remove_wechat')
  },
  // 微信登录
  loginWechat() {
    return post('/order/account/login_wechat')
  },
  // 微信登录
  loginWechatCheck(params) {
    return post('/order/account/check_login_wechat', params)
  },
  // 删除
  delete(id) {
    id = !Array.isArray(id) ? [id] : id
    return post(`/order/admin/delete/${id}`)
  },
  // 批量删除
  deleteAll(ids) {
    ids = !Array.isArray(ids) ? [ids] : ids
    return post('/order/admin/deleteAll', { ids })
  },
}

export default admin
