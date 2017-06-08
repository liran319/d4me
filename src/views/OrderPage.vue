<template>
  <Page id="order-page">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="all">全部订单</mt-tab-item>
      <mt-tab-item :id="unpaid">待付款</mt-tab-item>
      <mt-tab-item :id="paid">待收货</mt-tab-item>
      <mt-tab-item :id="delivered">已完成</mt-tab-item>
    </mt-navbar>
    <div class="order-list">

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
        selected:'all'
      }
    },
    computed: {
      orders(){
        return this.$store.state.orders.data.orders || []
      }
    },
    mounted(){
//      this.fetchProduct()
    },
  }
</script>
