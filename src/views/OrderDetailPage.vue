<template>
  <Page id="order-detail-page">
    <div class="content">
      <div class="order-header">
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
        <div class="detail-info">
          <div class="line" v-for="item, index in order.display_list" :key="index">
            <div class="label">{{item[0]}}</div>
            <div class="value">{{item[1]}}</div>
          </div>
        </div>
        <div class="payment-info">
          <div class="label">实付款:</div>
          <div class="value">￥{{order.final_price}}</div>
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
        }
      },
      filters:{
        address(order){
          var address = order.address||{}
          return order.order_type == 'online'?(address.province+' '+address.city+' '+address.street) : "门店自取"
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
