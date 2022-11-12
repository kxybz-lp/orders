/**
 * image模块接口列表
 */
import { get, post } from '@/utils/http'

const image = {
  // 图库分类列表
  getClassList() {
    return get('/order/image_class/index')
  },
  // 图库分类新增
  createClass(params) {
    return post('/order/image_class/create', params)
  },
  // 图库分类编辑
  updateClass(id, params) {
    return post('/order/image_class/edit/' + id, params)
  },
  // 图库分类删除
  deleteClass(id) {
    return post('/order/image_class/delete/' + id)
  },
  // 图片上传api
  uploadImageAction() {
    return '/api/order/image/upload'
  },
  // 图片列表
  getList(params) {
    return get('/order/image/index', params)
  },
  // 图库删除
  remove(id) {
    return post('/order/image/delete/' + id)
  },
  // 图库编辑
  update(id, params) {
    return post('/order/image/edit/' + id, params)
  },
}

export default image
