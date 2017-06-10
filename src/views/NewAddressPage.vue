<template>
  <Page id="new-address-page">
    <mt-header title="添加新地址">
      <mt-button slot="right" @click="createAddress">保存</mt-button>
    </mt-header>
    <div class="content">
      <mt-field label="收货人" v-model="name"/>
      <mt-field label="联系电话" type="number" v-model="phone"/>
      <city-picker label="省份" v-model="city"/>
      <mt-field label="详细地址" v-model="street"/>
    </div>
    <div class="content" style="margin-top:10px;">
      <mt-cell title="设置为默认">
        <mt-switch v-model="is_default"/>
      </mt-cell>
    </div>
  </Page>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        name: "",
        phone: "",
        city: "",
        street: "",
        is_default: false
      }
    },
    methods: {
      createAddress(){
        if (this.name && this.phone && this.city && this.street) {
          var self = this
          this.$store.dispatch('addresses/addAddress', {
            data: {
              name: this.name,
              phone: this.phone,
              city: this.city,
              street: this.street,
              default: this.is_default
            }
          }).then(function () {
            self.$router.back()
          })
        } else {
          Toast('您有未填写字段!');
        }
      }
    }
  }
</script>
