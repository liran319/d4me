<template>
  <Page id="account-page">
    <div class="header">我的</div>
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
        <div class="item" @click="go('/order')">
          <div class="icon icon-unpaid"></div>
          <div>待付款</div>
        </div>
        <div class="item" @click="go('/order')">
          <div class="icon icon-unreceived"></div>
          <div>待收货</div>
        </div>
        <div class="item" @click="go('/order')">
          <div class="icon icon-received"></div>
          <div>已收货</div>
        </div>
      </div>
    </div>
    <div class="expand">
      <div class="item">
        <div class="icon icon-voucher" @click="go('/voucher')"></div>
        <div>代金券</div>
      </div>
      <div class="item">
        <div class="icon icon-address"></div>
        <div>地址管理</div>
      </div>
      <div class="item is-selected" @click="go('/contact')">
        <div class="icon icon-contact"></div>
        <div>联系客服</div>
      </div>
      <div class="item">
        <div class="icon icon-download"></div>
        <div>下载APP</div>
      </div>
      <div class="item">
        <div class="icon icon-favorite" @click="go('/favorite')"></div>
        <div>收藏</div>
      </div>
      <div class="item is-selected" @click="go('/cart')">
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
      go(path){
        this.$router.push(path)
      }
    }
  }
</script>
