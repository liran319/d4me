<template>
  <Page id="home-page">
    <div class="mint-searchbar" @click="goSearchPage">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input type="search" placeholder="搜索" class="mint-searchbar-core">
      </div>
      <a class="mint-searchbar-cancel" style="display: none;">取消</a>
    </div>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="product-list" v-masonry transition-duration="0" item-selector=".product-item">
      <div v-masonry-tile column-width=".product-item" class="product-item" v-for="item in products" :key="item.id">
        <router-link :to="'/product/'+item.id">
          <img :src="item.image" :alt="item.title"/>
        </router-link>
        <div class="brand-title">{{item.brand.title}}</div>
        <div class="title">{{item.title}}</div>
        <div class="price">￥{{item.price}}</div>
      </div>
    </div>
  </Page>
</template>

<script>
  export default {
    computed: {
      pending(){
        return this.$store.state.products.pending
      },
      products(){
        return this.$store.state.products.data.products || []
      }
    },
    methods:{
      goSearchPage(){
        this.$router.push('/search')
      }
    },
    mounted(){
      this.$store.dispatch('products/fetch')
    },
    beforeDestroy(){
      this.$store.commit('products/reset')
    }
  }
</script>
