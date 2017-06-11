<template>
  <Page id="order-detail-page">
    <div class="content">
      <div class="order-header" @click="goSelectAddress">
        <div class="info" v-if="order.address&&order.order_type=='online'||order.order_type=='offline'">
          <div class="person">
            <div class="name">收货人: {{order.address&&order.address.name}}</div>
            <div class="phone">{{order.address&&order.address.phone}}</div>
          </div>
          <div class="address">收货地址: {{order|address}}</div>
        </div>
        <div class="info" v-else>请选择收货地址</div>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="order-info">
        <div class="product-list">
          <div class="product-item" v-for="item in order.order_items" :key="item.id">
            <div class="image" :style="{backgroundImage:'url('+item.product_image+')'}"></div>
            <div class="content">
              <div class="left">
                <div class="title">{{item.product_title|main_title}}</div>
                <div class="variant">{{item.product_title|sub_title}}</div>
              </div>
              <div class="right">
                <div class="price">￥{{item.price}} x {{item.quantity}}</div>
                <div class="status">{{order.status_text}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="shipping-method">
          <div class="label">发货方式</div>
          <div class="value">{{order.order_type=='online'?'邮寄':'门店自取'}}</div>
        </div>
        <div class="total-price">
          <div class="label">订单总计</div>
          <div class="value">￥{{order.final_price}}</div>
        </div>
      </div>
      <div class="order-use-coupon" @click="goSelectCoupon">
        <div class="shipping-method">
          <div class="label">{{coupon?'已使用':'使用代金券'}}</div>
          <div class="value">
            <i class="icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="footer" v-if="order.status == 'new'">
        <div class="button" @click="goPay">去支付</div>
      </div>
    </div>
  </Page>
</template>

<script>
  import order from '@/mixins/order'
  export default {
    mixins:[order],
    computed: {
      coupon(){
        return this.$store.state.order.coupon
      },
      pending(){
        return this.$store.state.order.pending
      },
      order(){
        return this.$store.state.order.data.order || {}
      }
    },
    methods:{
      fetch(){
        this.$store.dispatch('order/fetchOne',{
          id:this.$route.params.id
        })
      },
      goSelectAddress(){
        this.$router.push({path:'/address',query:{
          checkout:this.$route.params.id
        }})
      },
      goSelectCoupon(){
        this.$router.push({path:'/voucher',query:{
          checkout:this.$route.params.id
        }})
      }
    },
    filters:{
      address(order){
        var address = order.address||{}
        return order.order_type == 'online'?`${address.province||''} ${address.city||''} ${address.street||''}` : "门店自取"
      },
      main_title(value){
        return value.replace(/([^\s]+)\s+(.*)$/,"$1")
      },
      sub_title(value){
        return value.replace(/([^\s]+)\s+(.*)$/,"$2")
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('order/reset')
    },
    watch:{
      $route(){
        this.fetch()
      }
    }
  }
</script>
