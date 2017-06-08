<template>
  <Page id="product-detail-page" :class="{showTitle:showTitle}" :style="{backgroundImage:'url('+product.image+')'}" :key="$route.params.id">
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="product-content">
      <div class="product-title">
        <div class="title">{{product.title}}</div>
        <div class="price">CN￥{{product.price}}</div>
        <div class="variants">
          尺码 {{variants}}
        </div>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab1">图文详情</mt-tab-item>
        <mt-tab-item id="tab2">购买须知</mt-tab-item>
      </mt-navbar>
      <div class="content">
        <div class="item" v-for="item in product.photos" :key="item.id">
          <img class="image" :src="item.image"/>
        </div>
      </div>
      <div class="related-title"></div>
      <div class="related-product-list" v-masonry transition-duration="0" item-selector=".product-item">
        <div v-masonry-tile column-width=".product-item"  class="product-item" v-for="p in product.related" :key="product.id">
          <router-link :to="'/product/'+p.id">
            <img class="image" :src="p.image" :alt="p.title"/>
          </router-link>
          <div class="title">{{p.title}}</div>
          <div class="price">￥{{p.price}}</div>
        </div>
      </div>
    </div>
    <footer>
      <div class="left">
        <div class="button icon like">
          <div class="icon-unlike-o"></div>
          <span>收藏</span>
        </div>
      </div>
      <div class="right">
        <div class="button black">加入购物车</div><!--
        --><div class="button gold">立即购买</div>
      </div>
    </footer>
  </Page>
</template>

<script>
  export default {
    data(){
      return {
        selected: "tab1"
      }
    },
    computed: {
      pending(){
        return this.$store.state.product.pending
      },
      product(){
        return this.$store.state.product.data.product || {}
      },
      variants(){
        var variants = this.product.variants||[]
        return _.map(variants, function(item){return item.title}).join(' ')
      }
    },
    methods:{
      fetch(){
        this.$store.dispatch('product/fetchOne',{
          id:this.$route.params.id
        })
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('product/reset')
    },
    watch:{
      $route(){
        this.fetch()
      }
    }
  }
</script>
