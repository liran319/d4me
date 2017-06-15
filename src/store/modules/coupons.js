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
    },
    start: startRequest,
    complete: completeRequest,
    more_complete: completeMoreRequest,
    error: errorRequest
  },
  actions: {
    fetch ({ commit }, payload = {}) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      payload.options.params = payload.options.params||{}
      payload.options.params.auth_token = store.state.users.auth_token
      const promise = Axios.get('/coupons/', payload.options)
      commit('start', promise)
      promise.then(function(res){
        commit('complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
    fetchMore ({ commit }, { options, search }) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      payload.options.params = payload.options.params||{}
      payload.options.params.auth_token = store.state.users.auth_token
      const promise = Axios.get('/coupons/', payload.options)
      commit('start', promise)
      promise.then(function(res){
        commit('more_complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
    addCoupon ({ commit }, { code }) {
      if(!store.state.users.auth_token){
        wx_login()
      }
      const promise = Axios.post(`/coupons/`, {
        code: code,
        auth_token: store.state.users.auth_token
      })
      commit('start', promise)
      promise.then(function(res){
        commit('success', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
  }
}
