/**
 * list模块接口列表
 */
import { get, post } from '@/utils/http'

const admin = {
  // 管理员列表
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
  // 商品列表
  getGoodsList(id, params) {
    return get(`/getGoodsList/${id}`, {
      params,
    })
  },
  // 新闻详情,演示
  //  articleDetail (id, params) {
  //      return get(`${base.sq}/topic/${id}`, {
  //          params: params
  //      });
  //  },
  // post提交
  //  login (params) {
  //      return post(`${base.sq}/accesstoken`, qs.stringify(params));
  //  }
  // 其他接口…………
}

export default admin
