<template>
  <Page id="collection-page">
    <mt-navbar v-model="selected">
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="发现">发现</mt-tab-item>
      <mt-tab-item id="风尚">风尚</mt-tab-item>
      <mt-tab-item id="活动">活动</mt-tab-item>
      <mt-tab-item id="LAB">LAB</mt-tab-item>
    </mt-navbar>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="collections-list">
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
              <div class="image" :style="{backgroundImage:'url('+product.image+')'}"></div>
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
  export default {
    data(){
      return {
        selected:"all"
      }
    },
    computed: {
      pending(){
        return this.$store.state.articles.pending
      },
      articles(){
        return this.$store.state.articles.data.articles || []
      }
    },
    methods:{
      fetch(){
        this.$store.dispatch('articles/fetch',{
          options:{
            params:{
              category: this.selected=='all'?undefined:this.selected
            }
          }
        })
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('articles/reset')
    },
    watch:{
      selected(){
        this.fetch()
      }
    }
  }
</script>
