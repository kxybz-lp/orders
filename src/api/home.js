import { get, post } from '@/utils/http'

const home = {
  //导航数据
  getMenu() {
    return get('/api/index/menu')
  },
  // 首页轮播图
  getBanner() {
    return get('/api/index/banner')
  },
  // 用户信息
  getUser() {
    return get('/getUser') //`${base.sq}/getUser`
  },
  // post提交
  login(params) {
    return post('/accesstoken', qs.stringify(params))
  },
  // 其他接口…………
}

export default home
