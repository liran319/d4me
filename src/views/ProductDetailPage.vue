<template>
  <Page id="product-detail-page" :class="{showTitle:showTitle}" :style="{backgroundImage:'url('+product.image+')'}">
    <mt-header fixed :title="product.title">
      <div slot="left">
        <mt-button icon="back" @click="goBack"></mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="product-content">
      <v-waypoint @waypoint-in="inHandler" @waypoint-out="outHandler"></v-waypoint>
      <div class="title">{{product.title}}</div>
      <div class="price">CN￥{{product.price}}</div>
      <div class="variants">
        尺码 {{variants}}
      </div>

      <mt-navbar v-model="selected">
        <mt-tab-item id="tab1">图文详情</mt-tab-item>
        <mt-tab-item id="tab2">购买须知</mt-tab-item>
      </mt-navbar>
      <div class="item" v-for="item in product.photos" :key="item.id">
        <img class="image" :src="item.image"/>
      </div>
      <div class="related-title"></div>
      <div class="related-product-list">
        <div class="product-item" v-for="p in product.related" :key="product.id">
          <div class="image" :style="{backgroundImage:'url('+p.image+')'}"></div>
          <div class="title">{{p.title}}</div>
          <div class="price">￥{{p.price}}</div>
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
//      this.$store.commit('articles/reset')
    }
  }
</script>
