<template>
  <Page id="collection-page">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="item[1]" v-for="item,index in tabs" :key="index">{{item[0]}}</mt-tab-item>
    </mt-navbar>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="collections-list"
         v-infinite-scroll="fetchMore"
         infinite-scroll-disabled="hasMore"
         infinite-scroll-distance="10">
      <div :class="{'collection-item':true, list:item.products&&item.products.length}" v-for="item in articles" :key="item.id">
        <router-link class="banner-item" :to="'/articles/'+item.id">
          <div class="banner" :style="{backgroundImage:'url('+item.image+')'}" :alt="item.title"/>
          <div class="title">
            <div class="title-inner">
              {{item.title}}
            </div>
          </div>
          <like-button type="Article" :id="item.id" :active="item.fav"/>
        </router-link>
        <div class="product-list">
          <div class="product-list-inner">
            <div class="product-item" v-for="product in item.products" :key="product.id">
              <router-link :to="'/products/'+product.id" class="image" :style="{backgroundImage:'url('+product.image+')'}"></router-link>
              <div class="title">{{product.title}}</div>
              <div class="price">￥{{product.price}}</div>
            </div>
          </div>
        </div>
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
        storeName:'articles',
        selected:"all"
      }
    },
    computed: {
      global(){
        return this.$store.state.users.global||{}
      },
      tabs(){
        return this.global.article_categories||[]
      },
      articles(){
        return this.$store.state.articles.data.articles || []
      },
      condition(){
        var condition = {}
        if(this.selected != 'all'){
          condition.category = this.selected
        }
        return condition
      }
    },
    beforeDestroy(){
      this.$store.commit('articles/reset')
    },
    watch:{
      selected(){
        this.fetchData()
      }
    }
  }
</script>
