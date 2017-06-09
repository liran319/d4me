<template>
  <Page id="collection-page">
    <div class="header">专题</div>
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
      <div class="collection-item" v-for="item in articles" :key="item.id">
        <router-link class="banner-item" :to="'/collection/'+item.id">
          <div class="banner" :style="{backgroundImage:'url('+item.image+')'}" :alt="item.title"/>
          <div class="title">
            <div class="title-inner">
              {{item.title}}
            </div>
          </div>
        </router-link>
        <div class="product-list">
          <div class="product-list-inner">
            <div class="product-item" v-for="product in item.products" :key="product.id">
              <router-link :to="'/product/'+product.id" class="image" :style="{backgroundImage:'url('+product.image+')'}"></router-link>
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
