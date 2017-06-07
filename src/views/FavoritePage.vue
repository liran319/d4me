<template>
  <Page id="favorite-page">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="product">单品</mt-tab-item>
      <mt-tab-item :id="collection">专题</mt-tab-item>
      <mt-tab-item :id="mix">搭配</mt-tab-item>
    </mt-navbar>
  </Page>
</template>

<script>
    export default {
      data(){
        return {
          selected:'product'
        }
      }
    }
</script>
