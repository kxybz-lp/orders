/**
 * role模块接口列表
 */
import { get, post } from '@/utils/http'

const role = {
  // 列表
  getList(params) {
    return get('/order/role/index', params)
  },
}

export default role
