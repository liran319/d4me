<template>
  <Page id="collection-detail-page" :class="{showTitle:showTitle}" :style="{backgroundImage:'url('+article.image+')'}">
    <mt-header fixed :title="article.title">
      <div slot="left">
        <mt-button icon="back" @click="goBack"></mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="collection-content">
      <v-waypoint @waypoint-in="inHandler" @waypoint-out="outHandler"></v-waypoint>
      <div class="title">{{article.title}}</div>
      <div class="author">作者: {{article.author}}</div>
      <div class="item" v-for="item, index in article.content" :key="index">
        <img v-if="item.tag=='image'" class="image" :src="item.content"/>
        <div v-if="item.tag=='text'" class="text">{{item.content}}</div>
      </div>
      <div class="related-title"></div>
      <div class="related-product-list">
        <div class="product-item" v-for="product in article.products" :key="product.id">
          <router-link :to="'/product/'+product.id" class="image" :style="{backgroundImage:'url('+product.image+')'}"></router-link>
          <div class="title">{{product.title}}</div>
          <div class="price">￥{{product.price}}</div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
  import common from '@/mixins/common'

  export default {
    mixins:[common],
    data(){
      return {
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
      fetch(){
        this.$store.dispatch('article/fetchOne',{
          id:this.$route.params.id
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
