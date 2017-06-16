<template>
  <Page id="favorite-page">
    <mt-navbar v-model="selected">
      <mt-tab-item id="Product">单品</mt-tab-item>
      <mt-tab-item id="Article">专题</mt-tab-item>
    </mt-navbar>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="favs-list"
         v-infinite-scroll="fetchMore"
         infinite-scroll-disabled="hasMore"
         infinite-scroll-distance="10"
    >
      <div :class="'favs-item '+item.target_type" v-for="item in favs" :key="item.id">
        <template v-if="item.target_type=='Product'">
          <router-link :to="'/products/'+item.id" class="image" :style="{backgroundImage:'url('+item.image+')'}"></router-link>
          <div class="title">{{item.title}}</div>
          <div class="price">￥{{item.price}}</div>
          <like-button type="Product" :id="item.id" :active="item.fav"/>
        </template>
        <template v-else-if="item.target_type=='Article'">
          <router-link :to="'/articles/'+item.id" class="image" :style="{backgroundImage:'url('+item.image+')'}"></router-link>
          <div class="title">{{item.title}}</div>
          <like-button type="Article" :id="item.id" :active="item.fav"/>
        </template>
        <template v-else></template>
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
        storeName:'favs',
        selected:'Product'
      }
    },
    computed: {
      favs(){
        return this.$store.state.favs.data.favs || []
      },
      condition(){
        return {
          target_type:this.selected
        }
      }
    },
    methods:{
    },
    beforeDestroy(){
      this.$store.commit('favs/reset')
    },
    watch:{
      selected(){
        this.fetchData()
      }
    }
  }
</script>
