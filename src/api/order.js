/**
 * article模块接口列表
 */
import { get, post } from '@/utils/http'

const order = {
  // 新闻列表
  articleList() {
    return get(`/topics`)
  },
  // 新闻详情,演示
  articleDetail(id, params) {
    return get(`/topic/${id}`, {
      params: params,
    })
  },
  // post提交
  login(params) {
    return post(`/accesstoken`, qs.stringify(params))
  },
  // 其他接口…………
}

export default order
