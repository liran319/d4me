<template>
  <Page id="order-page">
    <mt-navbar v-model="selected">
      <mt-tab-item id="all">全部订单</mt-tab-item>
      <mt-tab-item id="new">待付款</mt-tab-item>
      <mt-tab-item id="paid">待收货</mt-tab-item>
      <mt-tab-item id="delivered">已完成</mt-tab-item>
    </mt-navbar>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="order-list"
         v-infinite-scroll="fetchMore"
         infinite-scroll-disabled="hasMore"
         infinite-scroll-distance="10"
    >
      <div class="order-item" v-for="order in orders" :key="order.id">
        <div class="header">
          <div class="text">订单编号: {{order.order_no}}</div>
          <div class="action" v-if="order.status=='new'" @click="cancelOrder(order.id)">取消订单</div>
        </div>
        <div class="product-list" @click="viewOrder(order.id)">
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
        <div class="toolbar">
          <div class="price">总计:￥{{order.final_price}}</div>
          <div class="action">
            <div class="button">确定付款</div>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
  import page from '@/mixins/page'

  export default {
    mixins:[page],
    data(){
      return {
        storeName:'orders',
        selected: this.$route.query.type||'all'
      }
    },
    computed: {
      orders(){
        return this.$store.state.orders.data.orders || []
      },
      condition(){
        var condition = {}
        if(this.selected&&this.selected!='all'){
          condition.status = this.selected
        }
        return condition
      }
    },
    filters:{
      main_title(value){
        return value.replace(/([^\s]+)\s+(.*)$/,"$1")
      },
      sub_title(value){
        return value.replace(/([^\s]+)\s+(.*)$/,"$2")
      }
    },
    methods:{
      cancelOrder(id){

      },
      refundOrder(od){

      },
      viewOrder(id){
        this.$router.push(`/order/${id}/`)
      }
    },
    beforeDestroy(){
      this.$store.commit('orders/reset')
    },
    watch:{
      selected(){
        this.fetchData()
      }
    }
  }
</script>
