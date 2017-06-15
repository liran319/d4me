import Axios from '@/utils/axios'
import _ from 'lodash'
import store from '../../store'
import wx_login from '@/utils/wx_login'

const startRequest = function (state, payload) {
  state.hasMore = true
  state.pending = true
  state.error = null
}

const completeRequest = function (state, payload) {
  state.pending = false
  state.data = payload.data
  state.hasMore = false
}

const completeMoreRequest = function (state, payload) {
  state.pending = false
  var res = payload.data
  var key = _.keys(res)[0]
  if(res[key]&&res[key].length){
    res[key] = (state.data&&state.data[key]?state.data[key]:[]).concat(res[key])
    state.data = res
    state.hasMore = false
  }else{
    state.hasMore = true
  }
}

const errorRequest = function (state, payload) {
  state.pending = false
  state.error = _.omit(payload.data, ['errors','non_field_errors','error'])
}

export default {
  namespaced:true,
  state: {
    error: null,
    coupon:null,
    pending: false,
    hasMore: false,
    data: {},
    list:{}
  },
  mutations: {
    reset(state, payload){
      state.data = {}
      state.error = null
      state.pending = false
      state.coupon = null
    },
    start: startRequest,
    complete: completeRequest,
    more_complete: completeMoreRequest,
    error: errorRequest,
    useCoupon (state, { id }) {
      state.coupon = id
    }
  },
  actions: {
    fetch ({ commit }, payload = {}) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      payload.options.params = payload.options.params||{}
      payload.options.params.auth_token = store.state.users.auth_token
      const promise = Axios.get('/orders/', payload.options)
      commit('start', promise)
      promise.then(function(res){
        commit('complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
    fetchOne ({ commit }, {id}) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      const promise = Axios.get(`/orders/${id}/`, {
        params:{
          auth_token : store.state.users.auth_token
        }
      })
      commit('start', promise)
      promise.then(function(res){
        commit('complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
    fetchMore ({ commit }, payload) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      payload.options.params = payload.options.params||{}
      payload.options.params.auth_token = store.state.users.auth_token
      const promise = Axios.get('/orders/', payload.options)
      commit('start', promise)
      promise.then(function(res){
        commit('more_complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
    updateOrder ({ commit }, {id, address_id, order_type}) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.patch(`/orders/${id}/`, {
        auth_token:store.state.users.auth_token,
        address_id: address_id,
        order_type: order_type
      })
    },
    quickOrder({ commit },{value, product_id, variant_id}){
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.post(`/orders/quick/`, {
        auth_token: store.state.users.auth_token,
        product_id: product_id,
        variant_id: variant_id,
        quantity: value
      })
    },
    createOrder({ commit },{ items }){
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.post(`/orders/`, {
        auth_token: store.state.users.auth_token,
        items: items
      })
    },
    payOrder({ commit }, { id, channel, coupon }){
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.post(`/orders/${id}/pay/`, {
        auth_token: store.state.users.auth_token,
        coupon: coupon,
        channel: channel
      })
    },
    acceptOrder ({ commit }, { id }) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.post(`/orders/${id}/accept/`, {
        auth_token: store.state.users.auth_token
      })
    },
    cancelOrder ({ commit }, { id }) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.post(`/orders/${id}/cancel/`, {
        auth_token: store.state.users.auth_token
      })
    },
    refundOrder ({ commit }, { id, amount }) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      return Axios.post(`/orders/${id}/refund/`, {
        auth_token: store.state.users.auth_token,
        amount: amount
      })
    },
  }
}
