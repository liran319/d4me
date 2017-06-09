import Vue from 'vue'
import keycode from 'keycode'
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
import Checkbox from '@/components/Checkbox'
import QuantityEditor from '@/components/QuantityEditor'

Vue.component('Page', Page)
Vue.component('filter-button', FilterButton)
Vue.component('filter-bar', FilterBar)
Vue.component('like-button', LikeButton)
Vue.component('quantity-editor', QuantityEditor)
Vue.component('checkbox', Checkbox)

import App from './App'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)

Vue.config.productionTip = false

Vue.directive('int', {
  inserted: function (el) {
    el.onkeydown = function (e){
      if((e.keyCode<48||e.keyCode>57)&&e.keyCode!=keycode("delete")&&e.keyCode!=keycode("backspace")){
        return false
      }
    }
    el.onblur = function (){
      if(el.value!="") {
        el.value = parseInt(el.value)
      }
    }
    if(el&&el.value != ""){
      setTimeout(function(){
        try{
          el.value = parseInt(el.value)
        }catch(e){
          el.value = ""
        }
      },0)
    }
  },
  unbind(el){
    if(el)el.onkeydown = null
    if(el)el.onblur = null
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
