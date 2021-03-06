import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { define } from '@/utils/factory'
import rest from '@/store/mixins/rest'
import _ from 'lodash'

const product = define(rest('/products'))
const articles = define(rest('/articles'))
const article = define(rest('/articles'))
const collections = define(rest('/collections'))
//const banners = define(rest('/banners'))
//const brands = define(rest('/brands'))
//const messages = define(rest('/messages'))
//const mixes = define(rest('/mixes'))
//const rewards = define(rest('/rewards'))

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
import users from '@/store/modules/users'
import products from '@/store/modules/products'
import orders from '@/store/modules/orders'
import coupons from '@/store/modules/coupons'
import addresses from '@/store/modules/address'
import favs from '@/store/modules/favs'
import cart from '@/store/modules/cart'

const store = new Vuex.Store({
  state: {
    category:null
  },
  actions,
  mutations,
  plugins,
  modules: {
    transition,
    products,
    product,
    //banners,
    collections,
    article,
    articles,
    addresses,
    favs,
    cart,
    //messages,
    //mixes,
    orders:_.cloneDeep(orders),
    order:_.cloneDeep(orders),
    coupons,
    //rewards,
    users
  },
  strict: false
})

export default store
