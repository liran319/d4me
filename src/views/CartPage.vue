<template>
  <Page id="cart-page">
    <div class="cart-list">
      <mt-cell-swipe class="cart-item" v-for="item in cart" :key="item.id" :right="[{content: '删除', handler: removeCartItem.bind(this, item.product_id, item.variant_id)}]">
        <checkbox/>
        <div class="product">
          <div class="image" :style="{backgroundImage:'url('+item.product_image+')'}"/>
          <div class="info">
            <div class="line">
              <div class="title">{{item.product_title}}</div>
              <div class="price">￥{{item.product_price}}</div>
            </div>
            <div class="variants">尺码: {{item.variant_title}}</div>
            <div class="quantity">数量: <quantity-editor v-model="item.quantity" @change="updateQuantity($event, item.product_id, item.variant_id)"/></div>
          </div>
        </div>
      </mt-cell-swipe>
    </div>
    <footer>
      <checkbox label="全选"/>
      <div class="info">
        总金额: <span class="price">￥{{total_price}}</span>
      </div>
      <div class="button">结算</div>
    </footer>
  </Page>
</template>

<script>
  import page from '@/mixins/page'

  export default {
    mixins:[page],
    data(){
      return {
        value:[],
        storeName:'cart'
      }
    },
    computed: {
      total_price(){

      },
      cart(){
        return this.$store.state.cart.data.order_items || []
      }
    },
    methods:{
      removeCartItem(product_id, variant_id){
        var self = this
        this.$store.dispatch('cart/remove_item',{
          product_id: product_id,
          variant_id: variant_id
        }).then(function(){
          self.fetchData()
        })
      },
      updateQuantity(value, product_id, variant_id){
        this.$store.dispatch('cart/set_item',{
          product_id: product_id,
          variant_id: variant_id,
          quantity: value
        })
      }
    },
    beforeDestroy(){
      this.$store.commit('cart/reset')
    }
  }
</script>
