<template>
  <Page id="new-coupon-page">
    <mt-header title="添加代金券">
      <mt-button slot="right" @click="createCoupon">保存</mt-button>
    </mt-header>
    <div class="content">
      <mt-field placeholder="填写代金券码" v-model="code"/>
    </div>
  </Page>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        code: ""
      }
    },
    methods: {
      createCoupon(){
        if (this.code) {
          var self = this
          this.$store.dispatch('coupons/addCoupon', {
            code:this.code
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
