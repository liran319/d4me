<template>
  <Page id="favorite-page">
    <mt-navbar v-model="selected">
      <mt-tab-item id="Product">单品</mt-tab-item>
      <mt-tab-item id="Article">专题</mt-tab-item>
      <mt-tab-item id="Mix">搭配</mt-tab-item>
    </mt-navbar>
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="favs-list"
         v-infinite-scroll="fetchMore"
         infinite-scroll-disabled="hasMore"
         infinite-scroll-distance="10"
    >
      <div class="favs-item" v-for="item in favs" :key="item.id">
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
