/**
 * list模块接口列表
 */
import { get, post } from '@/utils/http'

const admin = {
  // 商品列表
  getGoodsList(id, params) {
    return get(`/getGoodsList/${id}`, {
      params,
    })
  },
  // 商品分类
  getList() {
    return get(`/getList`)
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
