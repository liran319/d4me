import { Toast } from 'mint-ui';
export default {
  methods:{
    goPay(){
      var self = this
      this.$store.dispatch('order/payOrder',{
        id:this.$route.params.id,
        coupon:this.coupon,
        channel:'wx'
      }).then(function(res){
        pingpp.createPayment(res.data, (result, error) => {
          if(result){
            alert(result)
          }
          if(error){
            alert(error)
          }
          if (result == "success") {
            console.log('success')
            // window.location = "/"
            self.$router.push('/order/'+this.order_id+'/success')
            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
          } else if (result == "fail") {
            // charge 不正确或者微信公众账号支付失败时会在此处返回
            Toast(JSON.stringify(error))
          } else if (result == "cancel") {
            // 微信公众账号支付取消支付
          }
        });
      })
    }
  }
}
