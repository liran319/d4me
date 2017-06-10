<template>
  <Page id="new-address-page">
    <mt-header title="新增地址">
      <mt-button slot="right" @click="saveAddress">保存</mt-button>
    </mt-header>
    <div class="content">
      <mt-field label="收货人" v-model="username"/>
      <mt-field label="联系电话" type="number" v-model="phone"/>
      <city-picker label="省份" v-model="city"/>
      <mt-field label="详细地址" v-model="street"/>
    </div>
  </Page>
</template>

<script>
    export default {
      data(){
        return {
          username:"",
          phone:"",
          city:"",
          street:""
        }
      },
      methods:{
        saveAddress(){

        }
      }
    }
</script>
