import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { define } from '@/utils/factory'
import rest from '@/store/mixins/rest'

const products = define(rest('/products'))
const articles = define(rest('/articles'))
const article = define(rest('/articles'))
const collections = define(rest('/collections'))
const addresses = define(rest('/addresses'))
const banners = define(rest('/banners'))
const brands = define(rest('/brands'))
const coupons = define(rest('/coupons'))
const favs = define(rest('/favs'))
const messages = define(rest('/messages'))
const mixes = define(rest('/mixes'))
const orders = define(rest('/orders'))
const rewards = define(rest('/rewards'))
const users = define(rest('/users'))

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
    transition,
    products,
    banners,
    collections,
    article,
    articles,
    addresses,
    favs,
    messages,
    mixes,
    orders,
    rewards,
    users
  },
  strict: false
})

export default store
