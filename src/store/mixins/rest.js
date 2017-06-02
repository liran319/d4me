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

export default (urlPath)=>{
  return {
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
      fetchOne ({ commit }, payload = {}) {
        const id = payload.id, options = payload.options
        const promise = Axios.get(`${urlPath}/${id}/`, options)
        commit(events.start, promise)
        promise.then(function(res){
          commit('complete', res)
        }, function(res){
          commit('error', res.response)
        })
        return promise
      },
      fetch ({ commit }, payload = {}) {
        const promise = Axios.get(`${urlPath}/`, payload.options)
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
}
