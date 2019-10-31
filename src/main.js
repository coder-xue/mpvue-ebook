import Vue from 'vue'
import App from './App'

import MpvueRouterPatch from 'mpvue-router-patch'
import Store from '@/store'
Vue.use(MpvueRouterPatch)

Vue.config.productionTip = false
Vue.prototype.$store = Store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
