<template>
  <Page id="account-page">
    <mt-header title="我的" class="fixed" fixed>
      <mt-button icon="more" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="account-header">
      <div class="avatar"></div>
      <div class="avatar-name">D4ME</div>
    </div>
    <div class="orders">
      <div class="header">
        <div class="left">我的订单</div>
        <div class="right">
          <div class="order-link" @click="goOrders">查看全部订单</div>
        </div>
      </div>
      <div class="content">
        <div class="item" @click="goOrders">
          <div class="icon icon-unpaid"></div>
          <div>待付款</div>
        </div>
        <div class="item" @click="goOrders">
          <div class="icon icon-unreceived"></div>
          <div>待收货</div>
        </div>
        <div class="item" @click="goOrders">
          <div class="icon icon-received"></div>
          <div>已收货</div>
        </div>
      </div>
    </div>
    <div class="expand">
      <div class="item">
        <div class="icon icon-voucher"></div>
        <div>代金券</div>
      </div>
      <div class="item">
        <div class="icon icon-address"></div>
        <div>地址管理</div>
      </div>
      <div class="item is-selected">
        <div class="icon icon-contact"></div>
        <div>联系客服</div>
      </div>
      <div class="item">
        <div class="icon icon-download"></div>
        <div>下载APP</div>
      </div>
      <div class="item">
        <div class="icon icon-favorite"></div>
        <div>收藏</div>
      </div>
      <div class="item is-selected">
        <div class="icon icon-cart"></div>
        <div>购物车</div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </Page>
</template>

<script>
  export default {
    methods:{
      goOrders(){
        this.$router.push('/order')
      }
    }
  }
</script>
