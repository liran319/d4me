<template>
  <Page id="product-page">
    <filter-bar v-model="selected">
      <filter-button id="默认"/>
      <filter-button id="最新"/>
      <filter-button id="价格" asc/>
    </filter-bar>
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
    data(){
      return {
        selected:'默认'
      }
    },
    computed: {
      pending(){
        return this.$store.state.products.pending
      },
      products(){
        return this.$store.state.products.data.products || []
      }
    },
    mounted(){
      if(this.$route.query.search){
        this.$store.dispatch('products/search',{
          options:{
            params: {
              q:this.$route.query.search
            }
          }
        })
      }else{
        this.$store.dispatch('products/fetch',{
          options:{
            params: this.$route.query
          }
        })
      }
    },
    beforeDestroy(){
      this.$store.commit('products/reset')
    },
    watch:{
      selected(){
        console.log(this.selected)
      }
    }
  }
</script>
