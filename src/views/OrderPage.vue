<template>
  <Page id="order-page">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="all">全部订单</mt-tab-item>
      <mt-tab-item :id="unpaid">待付款</mt-tab-item>
      <mt-tab-item :id="paid">待收货</mt-tab-item>
      <mt-tab-item :id="delivered">已完成</mt-tab-item>
    </mt-navbar>
  </Page>
</template>

<script>
    export default {
      data(){
        return {
          selected:'all'
        }
      }
    }
</script>
