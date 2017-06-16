import { Toast } from 'mint-ui';
export default {
  methods:{
    goPay(){
      var self = this
      var id = this.$route.params.id
      if(this.order.order_type == 'online' && !this.order.address){
        Toast("请选择收货地址")
      }else{
        this.$store.dispatch('order/payOrder',{
          id:id,
          coupon:this.coupon,
          channel:'wx_pub'
        }).then(function(res){
          pingpp.createPayment(res.data, (result, error) => {
            if (result == "success") {
              self.$router.replace('/order/'+id+'/success')
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
}
