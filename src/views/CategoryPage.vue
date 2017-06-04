<template>
  <Page id="category-page">
      <div class="category-list">
        <div class="category-item main" v-for="category,index in categories" :key="index" @click="onClickCategory(category)">
          <img :src="category[1]"/>
          <span>{{category[0]}}</span>
        </div>
      </div>
  </Page>
</template>

<script>
  export default {
    data(){
      return {
        mainCategory:null
      }
    },
    computed: {
      global(){
        return this.$store.state.users.global||{}
      },
      categories(){
        return this.global.categories
      },
      subcategories(){
        return this.global.subcategories
      }
    },
    methods:{
      onClickCategory(category){
        if(this.subcategories[category[0]]){
          this.mainCategory = category[0]
          this.openSubCategory()
        }else{
          this.$router.push({
            path:'/product',
            query:{
              category:category[0]=="全部"?undefined:category[0]
            }
          })
        }
      },
      openSubCategory(){

      },
      closeSubCategory(){

      }
    }
  }
</script>
