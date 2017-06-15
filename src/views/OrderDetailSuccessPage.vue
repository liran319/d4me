<template>
  <Page id="order-detail-success-page">
    <div class="content">
      <div class="price">{{order.final_price}}元</div>
      <div class="title">支付成功</div>
      <div class="divider"></div>
      <div class="text">
        感谢您对D4ME的支持与信任，为后续提供更优质的服务
        烦请您留下联系方式，同时您将享受D4ME新品推荐、
        专属折扣、造型搭配等更多服务。
      </div>
      <footer>
        <div class="button" @click="goOrders">确认</div>
      </footer>
    </div>
  </Page>
</template>

<script>
  export default {
    computed: {
      pending(){
        return this.$store.state.order.pending
      },
      order(){
        return this.$store.state.order.data.order || {}
      }
    },
    methods: {
      fetch(){
        this.$store.dispatch('order/fetchOne', {
          id: this.$route.params.id
        })
      },
      goOrders(){
        this.$router.push('/order')
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('order/reset')
    },
    watch: {
      $route(){
        this.fetch()
      }
    }
  }
</script>
