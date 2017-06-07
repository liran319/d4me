<template>
  <Page id="product-page">
    <filter-bar v-model="selected">
      <filter-button id="default" title="默认"/>
      <filter-button id="updated_at" title="最新"/>
      <filter-button id="price" asc title="价格"/>
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
        selected:'default'
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
      this.fetchProduct()
    },
    methods:{
      fetchProduct(){
        var params;
        if(this.$route.query.search){
          params = Object.assign({
            q:this.$route.query.search
          })
          if(this.selected!='default')params.order = this.selected

          this.$store.dispatch('products/search',{
            options:{
              params: params
            }
          })
        }else{
          params = Object.assign({},this.$route.query)
          if(this.selected!='default')params.order = this.selected

          this.$store.dispatch('products/fetch',{
            options:{
              params: params
            }
          })
        }
      }
    },
    beforeDestroy(){
      this.$store.commit('products/reset')
    },
    watch:{
      selected(){
        this.fetchProduct()
      }
    }
  }
</script>
