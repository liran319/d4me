<template>
  <Page id="collection-detail-page" :style="{paddingTop:padding+'px',backgroundImage:'url('+article.image+')'}">
    <like-button type="Article" :id="article.id" :active="article.fav"/>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="collection-content">
      <div class="title">{{article.title}}</div>
      <div class="author">作者: {{article.author}}</div>
      <div class="item" v-for="item, index in article.content" :key="index">
        <img v-if="item.tag=='image'" class="image" :src="item.content"/>
        <div v-if="item.tag=='text'" class="text">{{item.content}}</div>
      </div>
      <div class="related-title" v-show="article.products&&article.products.length"></div>
      <div class="related-product-list" v-show="article.products&&article.products.length">
        <div class="product-item" v-for="product in article.products" :key="product.id">
          <router-link :to="'/products/'+product.id" class="image" :style="{backgroundImage:'url('+product.image+')'}"></router-link>
          <div class="title">{{product.title}}</div>
          <div class="price">￥{{product.price}}</div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
  export default {
    data(){
      return {
        padding:300,
      }
    },
    computed: {
      pending(){
        return this.$store.state.article.pending
      },
      article(){
        return this.$store.state.article.data.article || {}
      }
    },
    methods:{
      loadImage(url){
        var self = this
        var image = new Image()
        var width = window.screen.width
        image.onload = function(){
          self.padding = image.height/image.width*width
        }
        image.src = url
      },
      fetch(){
        var self = this
        this.$store.dispatch('article/fetchOne',{
          id:this.$route.params.id
        }).then(function(){
          self.loadImage(self.article.image)
        })
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('article/reset')
    }
  }
</script>
