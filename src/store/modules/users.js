import Axios from '@/utils/axios'

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
    data: {},
    global: {}
  },
  mutations: {
    reset(state, payload){
      state.data = {}
      state.list = {}
      state.error = null
      state.pending = false
    },
    start: startRequest,
    complete: completeRequest,
    success: successRequest,
    error: errorRequest,
    global_complete(state, payload){
      console.log(payload.data)
      state.global = payload.data
      state.ready = true
    },
    ready(state){
      state.ready = true
    }
  },
  actions: {
    login ({ commit }, { phone, email, password }) {
      return Axios.post('/users/login/', {
        phone: phone,
        email: email,
        password: password
      })
    },
    phone_login ({ commit }, { phone, valid_code }) {
      return Axios.post('/users/phone_login/', {
        phone: phone,
        valid_code: valid_code
      })
    },
    signup ({ commit }, { data }) {
      return Axios.post('/users/signup/', data)
    },
    logout ({ commit }, { auth_token }) {
      return Axios.post('/users/logout/', {
        auth_token: auth_token
      })
    },
    update_phone ({ commit }, { phone, valid_code, auth_token }) {
      return Axios.post('/users/update_phone/', {
        phone: phone,
        valid_code: valid_code,
        auth_token: auth_token
      })
    },
    change_password ({ commit }, { password, old_password }) {
      return Axios.post('/users/change_password/', {
        password: password,
        old_password: old_password
      })
    },
    send_valid_code ({ commit }, { phone}) {
      return Axios.post(`/users/send_valid_code/`, {
        phone: phone
      })
    },
    reset_password ({ commit }, { phone, valid_code, password}) {
      return Axios.post(`/users/reset_password/`, {
        phone: phone,
        valid_code: valid_code,
        password: password
      })
    },
    upload ({ commit }, { id, image, auth_token}) {
      return Axios.post(`/users/${id}/upload/`, {
        id: id,
        image: image,
        auth_token: auth_token
      })
    },
    get_wx_login_code ({ commit }) {
      return Axios.get(`/users/wx_login_code/`)
    },
    get_wx_auth_code ({ commit }) {
      return Axios.get(`/users/wx_auth_code/`)
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
    fetchOne ({ commit }, payload = {}) {
      const id = payload.id
      const promise = Axios.get(`/users/${id}/`)
      commit('start', promise)
      promise.then(function (res) {
        commit('complete', res)
      }, function (res) {
        commit('error', res.response)
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
