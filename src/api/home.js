import { get, post } from '@/utils/http'

const home = {
  //面板数据
  getPanels() {
    return post('/order/index/panels')
  },
  // 前十签单门店
  getBranch(params) {
    return post('/order/index/branch_sign', params)
  },
  // 柱状图数据
  getBarData(params) {
    return post('/order/index/ercharts_bar', params)
  },
  // 饼状图数据
  getPieData() {
    return post('/order/index/ercharts_pie')
  },
  //公告数据
  getNotice() {
    return post('/order/index/notice')
  },
  // 消息通知
  getNote() {
    return post('/order/index/note')
  },
}

export default home
