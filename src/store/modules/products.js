import Axios from '@/utils/axios'
import _ from 'lodash'

const startRequest = function (state, payload) {
  state.pending = true
  state.error = null
}

const completeRequest = function (state, payload) {
  state.pending = false
  state.data = payload.data
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
    error: errorRequest
  },
  actions: {
    search ({ commit }, payload = {}) {
      const options = payload.options
      const promise = Axios.get(`/products/search/`, options)
      commit('start', promise)
      promise.then(function(res){
        commit('complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    },
    fetch ({ commit }, payload = {}) {
      const promise = Axios.get(`/products/`, payload.options)
      commit('start', promise)
      promise.then(function(res){
        commit('complete', res)
      }, function(res){
        commit('error', res.response)
      })
      return promise
    }
  }
}
