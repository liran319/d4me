import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import createLogger from 'vuex/dist/logger'

let plugins = []
const debug = process.env.NODE_ENV !== 'production'
if (debug) {
  plugins.push(createLogger())
}

import * as actions from './actions'
import * as mutations from './mutations'

// modules
import transition from '@/store/modules/transition'

const store = new Vuex.Store({
  state: {},
  actions,
  mutations,
  plugins,
  modules: {
    transition
  },
  strict: false
})

export default store
