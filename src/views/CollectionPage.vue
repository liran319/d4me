<template>
  <Page id="collection-page">
    <div class="header">专题</div>
    <mt-navbar v-model="selected">
      <mt-tab-item :id="item[1]" v-for="item,index in tabs" :key="index">{{item[0]}}</mt-tab-item>
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
  export default {
    data(){
      return {
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
