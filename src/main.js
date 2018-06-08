// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import http from './utils/http.js'
import storage from './utils/storage.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import BigLoading from './components/BigLoading.vue'
import WxShare from './components/WxShare'
import diff from './filters/diff'

import '@/assets/css/com-phone.css'
import '@/assets/css/main.less'
import '@/assets/js/com-phone.js'

Vue.config.productionTip = false
Vue.filter('diff', diff)
Vue.use(MintUI)
Vue.use(storage)
Vue.use(http, axios)
Vue.component(WxShare.name, WxShare)
Vue.component(BigLoading.name, BigLoading)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
