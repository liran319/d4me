<template>
  <Page id="search-page">
    <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input type="search" ref="search" placeholder="搜索" class="mint-searchbar-core" v-model="value" @keydown.enter="onSearch">
      </div>
      <a class="mint-searchbar-cancel" v-show="value" @click="cancelSearch">取消</a>
    </div>
  </Page>
</template>

<script>
    export default {
      data(){
        return {
          value:""
        }
      },
      mounted(){
        var self = this
        setTimeout(function(){
          self.$refs.search.focus()
        }, 500)
      },
      methods:{
        onSearch(){
          if(this.value){
            this.$router.push({path:"/product", query:{
              search:this.value
            }})
          }
        },
        cancelSearch(){
          this.value = ""
        }
      }
    }
</script>
