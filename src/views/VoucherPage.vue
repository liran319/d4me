<template>
  <Page id="coupon-page">
    <mt-header title="代金券">
      <i class="icon icon-plus" slot="right" @click="addCoupon"></i>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="available">未使用</mt-tab-item>
      <mt-tab-item id="used">已使用</mt-tab-item>
      <mt-tab-item id="expired">已过期</mt-tab-item>
    </mt-navbar>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="coupons-list">
      <div class="coupons-item" v-for="item in coupons" :key="item.id" @click="useCoupon(item.id)">
        <div class="content">
          <div class="title">{{item.title}}</div>
          <div class="condition">满{{item.min_price}}可使用</div>
          <div class="validate-date">有效期至: {{item.expires_at}}</div>
        </div>
        <div class="price">￥{{item.savings_amount}}</div>
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
        storeName:'coupons',
        selected:'available'
      }
    },
    computed: {
      coupons(){
        return this.$store.state.coupons.data.coupons || []
      },
      condition(){
        return {
          coupon_status:this.selected
        }
      }
    },
    methods:{
      useCoupon(id){
        if(this.$route.query.checkout){
          this.$store.commit('order/useCoupon',{id: id})
          this.$router.back()
        }
      },
      addCoupon(){
        this.$router.push('/voucher/new')
      }
    },
    beforeDestroy(){
      this.$store.commit('coupons/reset')
    },
    watch:{
      selected(){
        this.fetchData()
      }
    }
  }
</script>
