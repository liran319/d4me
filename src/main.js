import Vue from 'vue'
/* 组件 */
import Mint from 'mint-ui';
Vue.use(Mint);

import App from './App'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
