import Axios from '@/utils/axios'
import store from '../../store'

const startRequest = function (state, payload) {
  state.pending = true
  state.error = null
}

const completeRequest = function (state, payload) {
  state.pending = false
  state.data = payload.data
}

const successRequest = function (state, payload) {
  state.pending = false
}

const errorRequest = function (state, payload) {
  state.pending = false
  state.error = _.omit(payload.data, [ 'errors', 'non_field_errors', 'error' ])
}

export default {
  namespaced: true,
  state: {
    ready: false,
    error: null,
    pending: false,
    auth_token: 'bxYzqz_6JQMb9oSfxcJx',
    global: {},
    user: {}
  },
  mutations: {
    reset(state, payload){
      state.error = null
      state.pending = false
    },
    start: startRequest,
    complete: completeRequest,
    success: successRequest,
    error: errorRequest,
    global_complete(state, payload){
      state.global = payload.data
      state.ready = true
    },
    set_token(state, payload){
      state.auth_token = payload.auth_token
    },
    set_user_info(state, payload){
      state.user = payload.user.user
    },
    ready(state){
      state.ready = true
    }
  },
  actions: {
    upload ({ commit }, { file }) {
      var formData = new FormData()
      formData.append('image', file)
      formData.append('auth_token', store.state.users.auth_token)
      formData.append('id', store.state.users.user.id)
      return Axios.post(`/users/${store.state.users.user.id}/upload/`, formData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    },
    fetch_global_info ({ commit }) {
      const promise = Axios.get(`/users/global_info/`)
      promise.then(function (res) {
        commit('global_complete', res)
      }, function (res) {
        commit('error', res.response)
      })
      return promise
    },
    fetch_user_info ({ commit }) {
      const promise = Axios.get(`/users/`, {
        params: {
          auth_token: store.state.users.auth_token
        }
      }).then((res)=> {
        commit('set_user_info', {
          user: res.data
        })
      })
      return promise
    },
    patch ({ commit }, payload = {}) {
      const id = payload.id, data = payload.data
      const promise = Axios.patch(`/users/${id}/`, data)
      commit('start', promise)
      promise.then(function (res) {
        commit('success', res)
      }, function (res) {
        commit('error', res.response)
      })
      return promise
    },
  }
}
