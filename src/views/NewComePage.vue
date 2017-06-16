<template>
  <Page id="newcome-page">
    <div class="banner"></div>
    <div class="title"></div>
    <div class="product-list">
      <router-link :to="'/products/'+item.id" class="product-item" v-for="item in products" :key="item.id">
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="price">新人专享价: ￥{{item.price}}</div>
          <div class="origin_price">原价: ￥{{item.compare_price}}</div>
        </div>
        <div class="image" :style="{backgroundImage:'url('+item.image+')'}"></div>
      </router-link>
    </div>
  </Page>
</template>

<script>
    export default {
      computed: {
        products(){
          return this.$store.state.products.data.products || []
        }
      },
      mounted(){
        this.$store.dispatch('products/fetch',{
          options:{
            params:{
              special: 'welcome'
            }
          }
        })
      },
      beforeDestroy(){
        this.$store.commit('products/reset')
      }
    }
</script>
