/**
 * Created by LIPING on 2020/10/31
 */
import axios from 'axios'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
import store from '@/store/index'
import base from '@/api/base' // 导入接口域名列表
// 弹窗提示
//  ElMessage({
//      message: res.message || 'Error',
//      type: 'error',
//      duration: 5 * 1000
//  })
//  // 确认弹窗提示并添加成功的回调
//  MessageBox.confirm('You have been logged out,  or log in again', 'Confirm logout', {
//     confirmButtonText: 'Re-Login',
//     cancelButtonText: 'Cancel',
//     type: 'warning'
// }).then(() => {
//     store.dispatch('user/resetToken').then(() => {
//         location.reload()
//    })
// })

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = base.sq
}
// 请求超时时间
axios.defaults.timeout = 5000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath },
          })
          break
        case 403:
          ElMessage({
            message: '登录过期，请重新登录',
            type: 'error',
            duration: 1500,
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath,
              },
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          ElMessage({
            message: '网络请求不存在',
            type: 'error',
            duration: 1500,
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          ElMessage({
            message: error.response.data.message,
            type: 'error',
            duration: 1500,
          })
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
