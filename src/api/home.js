import { get, post } from '@/utils/http'

const home = {
  //导航数据
  getMenu() {
    return get('/index/menu')
  },
  // 其他接口…………
}

export default home
