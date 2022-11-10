// 权限指令
import store from '@/store'
function hasPermission(value, el = false) {
  if (typeof value === 'number' && !isNaN(value)) {
    const hasAuth = store.state.adminInfo.auths.includes(value.toString())
    if (el && !hasAuth) {
      el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
  } else {
    throw new Error(`需要配置权限ID`)
  }
}
export default {
  install(app) {
    app.directive('permission', {
      mounted(el, binding) {
        hasPermission(binding.value, el)
      },
    })
  },
}
