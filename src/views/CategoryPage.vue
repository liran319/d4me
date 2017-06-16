<template>
  <Page id="category-page">
      <div class="category-list">
        <div :class="{'category-item':true, active:mainCategory&&mainCategory==category[0]}" v-for="category,index in categories" :key="index" @click="onClickCategory(category)">
          <img :src="category[1]"/>
          <span>{{category[0]}}</span>
        </div>
      </div>
      <div :class="{'sub category-list':true,active:mainCategory}">
        <div class="category-item" v-for="category,index in subcategories[mainCategory]" :key="index" @click="onClickSubCategory(category)">
          <img :src="category[1]"/>
          <span>{{category[0]}}</span>
        </div>
      </div>
  </Page>
</template>

<script>
  export default {
    computed: {
      global(){
        return this.$store.state.users.global||{}
      },
      categories(){
        return this.global.categories
      },
      subcategories(){
        return this.global.subcategories
      },
      mainCategory(){
        return this.$store.state.category
      }
    },
    methods:{
      onClickCategory(category){
        if(this.subcategories[category[0]]){
          this.$store.commit('set_category',{
            category:category[0]
          })
        }else{
          this.$store.commit('set_category',{
            category:null
          })
          this.$router.push({
            path:'/products',
            query:{
              category:category[0]=="全部"?undefined:category[0]
            }
          })
        }
      },
      onClickSubCategory(category){
        this.$router.push({
          path:'/products',
          query:{
            category:category[0]=="全部配饰"?"配饰":category[0]
          }
        })
      }
    }
  }
</script>
