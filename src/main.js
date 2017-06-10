import Vue from 'vue'
import keycode from 'keycode'
import VueMasonryPlugin from 'vue-masonry'
import { Toast,Navbar,Button,Spinner,InfiniteScroll,Actionsheet,Header,TabItem,Tabbar,CellSwipe,Search,Field} from 'mint-ui'
/* 组件 */
Vue.use(InfiniteScroll)
Vue.component(Toast.name, Toast)
Vue.component(Navbar.name, Navbar)
Vue.component(Spinner.name, Spinner)
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Search.name, Search);
Vue.component(Field.name, Field);
/* 自定义全局组件*/
Vue.use(VueMasonryPlugin)

import Page from '@/container/Page'
import FilterBar from '@/components/FilterBar'
import FilterButton from '@/components/FilterButton'
import LikeButton from '@/components/LikeButton'
import Checkbox from '@/components/Checkbox'
import QuantityEditor from '@/components/QuantityEditor'
import CityPicker from '@/components/CityPicker'

Vue.component('Page', Page)
Vue.component('filter-button', FilterButton)
Vue.component('filter-bar', FilterBar)
Vue.component('like-button', LikeButton)
Vue.component('quantity-editor', QuantityEditor)
Vue.component('checkbox', Checkbox)
Vue.component('city-picker', CityPicker)

import App from './App'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)

Vue.config.productionTip = false

Vue.directive('int', {
  inserted: function (el) {
    el.onkeydown = function (e) {
      if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != keycode("delete") && e.keyCode != keycode("backspace")) {
        return false
      }
    }
    el.onblur = function () {
      if (el.value != "") {
        el.value = parseInt(el.value)
      }
    }
    if (el && el.value != "") {
      setTimeout(function () {
        try {
          el.value = parseInt(el.value)
        } catch (e) {
          el.value = ""
        }
      }, 0)
    }
  },
  unbind(el){
    if (el)el.onkeydown = null
    if (el)el.onblur = null
  }
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
