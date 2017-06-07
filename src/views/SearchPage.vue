<template>
  <Page id="search-page">
    <form @submit="onSearch">
      <div class="mint-searchbar">
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search"></i>
          <input type="search" ref="search" placeholder="搜索" class="mint-searchbar-core"/>
        </div>
      </div>
    </form>
  </Page>
</template>

<script>
  export default {
    methods: {
      onSearch(e){
        this.$router.push({
          path: "/product", query: {
            search: this.$refs.search.value
          }
        })
        e.preventDefault()
      }
    }
  }
</script>
