import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as utils from '@/utils/utils'
import api from '@/api'

import '@/assets/css/global.css'
import * as ElIcon from '@element-plus/icons-vue'
const app = createApp(App)
for (let iconName in ElIcon) {
  app.component(iconName, ElIcon[iconName])
}

app.config.globalProperties.$utils = utils
app.config.globalProperties.$api = api

app.use(store).use(router).mount('#app')
