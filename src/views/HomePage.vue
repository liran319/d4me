<template>
  <Page id="home-page">
    <div class="mint-searchbar" @click="goSearchPage">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <div class="mint-searchbar-core">搜索</div>
      </div>
    </div>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="product-list" v-masonry transition-duration="0" item-selector=".product-item"
         v-infinite-scroll="fetchMore"
         infinite-scroll-disabled="hasMore"
         infinite-scroll-distance="10"
    >
      <div v-masonry-tile column-width=".product-item" class="product-item" v-for="item in products" :key="item.id">
        <router-link :to="'/product/'+item.id">
          <img :src="item.image" :alt="item.title"/>
        </router-link>
        <div class="brand-title">{{item.brand&&item.brand.title}}</div>
        <div class="title">{{item.title}}</div>
        <div class="price">￥{{item.price}}</div>
        <like-button type="Product" :id="item.id" :active="item.fav"/>
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
        storeName:'products'
      }
    },
    computed: {
      products(){
        return this.$store.state.products.data.products || []
      }
    },
    methods:{
      goSearchPage(){
        this.$router.push('/search')
      }
    },
    beforeDestroy(){
      this.$store.commit('products/reset')
    }
  }
</script>
