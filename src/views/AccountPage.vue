<template>
  <Page id="account-page">
    <div class="header">我的</div>
    <div class="account-header">
      <div class="avatar" :style="{'background-image':'url('+user.image+')'}"></div>
      <div class="avatar-name">{{user.username}}</div>
      <div class="button" @click="go('/newcome')" v-if="user.new_user">新人专享</div>
    </div>
    <div class="orders">
      <div class="header">
        <div class="left">我的订单</div>
        <div class="right">
          <div class="order-link" @click="go('/order')">查看全部订单</div>
        </div>
      </div>
      <div class="content">
        <div class="item" @click="go('/order','new')">
          <div class="icon icon-unpaid"></div>
          <div>待付款</div>
        </div>
        <div class="item" @click="go('/order','paid')">
          <div class="icon icon-unreceived"></div>
          <div>待收货</div>
        </div>
        <div class="item" @click="go('/order','delivered')">
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
        <div class="icon icon-address" @click="go('/address')"></div>
        <div>地址管理</div>
      </div>
      <div class="item is-selected" @click="go('/contact')">
        <div class="icon icon-contact"></div>
        <div>联系客服</div>
      </div>
      <div class="item">
        <div class="icon icon-download" @click="go('/download')"></div>
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
    computed:{
      user(){
        return this.$store.state.users.user||{}
      }
    },
    methods:{
      go(path, type){
        let query = {}
        if(type){
          query = {
            type:type
          }
        }
        this.$router.push({
          path:path,
          query:query
        })
      }
    }
  }
</script>
