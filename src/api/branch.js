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
  getData(params) {
    return get('/order/branch/getData', params)
  },
}

export default branch
