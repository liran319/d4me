import Vue from 'vue'
/* 组件 */
import Mint from 'mint-ui'
Vue.use(Mint)
/* 自定义全局组件*/
import VueMasonryPlugin from 'vue-masonry';
Vue.use(VueMasonryPlugin)
//import VueWaypoint from 'vue-waypoint'
//Vue.use(VueWaypoint)

import Page from '@/container/Page'
import FilterBar from '@/components/FilterBar'
import FilterButton from '@/components/FilterButton'
import LikeButton from '@/components/LikeButton'
Vue.component('Page', Page)
Vue.component('filter-button', FilterButton)
Vue.component('filter-bar', FilterBar)
Vue.component('like-button', LikeButton)

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
