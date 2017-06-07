<template>
  <Page id="voucher-page">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="available">未使用</mt-tab-item>
      <mt-tab-item :id="used">已使用</mt-tab-item>
      <mt-tab-item :id="expired">已过期</mt-tab-item>
    </mt-navbar>
  </Page>
</template>

<script>
    export default {
      data(){
        return {
          selected:'available'
        }
      }
    }
</script>
