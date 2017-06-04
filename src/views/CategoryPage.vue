<template>
  <Page id="category-page">
    category
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
      }
    }
  }
</script>
