import Axios from '@/utils/axios'
import _ from 'lodash'
import store from '../../store'

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
    error: errorRequest,
    set_quantity(state, { product_id, variant_id, quantity}){
      let list = state.data.order_items||[]
      let position = _.findIndex(list,function(item){
        return item.product_id == product_id&&item.variant_id == variant_id
      })
      if(position>-1){
        list[position].quantity = quantity
      }
    }
  },
  actions: {
    fetch ({ commit }) {
      const promise = Axios.get('/orders/cart_items/', {
        params:{
          auth_token: store.state.users.auth_token
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
    add_item({ commit }, { product_id, variant_id, quantity}){
      const promise = Axios.post('/orders/add_cart_item/', {
        auth_token: store.state.users.auth_token,
        product_id: product_id,
        variant_id: variant_id,
        quantity: quantity
      })
      return promise
    },
    remove_item({ commit }, { product_id, variant_id}){
      const promise = Axios.post('/orders/remove_cart_item/', {
        auth_token: store.state.users.auth_token,
        product_id: product_id,
        variant_id: variant_id
      })
      return promise
    },
    set_item({ commit }, { product_id, variant_id, quantity}){
      const promise = Axios.post('/orders/set_cart_item/', {
        auth_token: store.state.users.auth_token,
        product_id: product_id,
        variant_id: variant_id,
        quantity: quantity
      }).then(()=>{
        commit('set_quantity',{
          product_id: product_id,
          variant_id: variant_id,
          quantity: quantity
        })
      })
      return promise
    }
  }
}
