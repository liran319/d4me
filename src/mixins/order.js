export default {
  data(){
    return {
      actions:[{
        name:"支付宝",
        method:this.payOrder.bind(this,"alipay")
      },{
        name:"微信",
        method:this.payOrder.bind(this,"wx")
      }],
      sheetVisible: false
    }
  },
  methods:{
    goPay(){
      this.$store.dispatch('order/payOrder',{
        id:this.$route.params.id,
        coupon:this.coupon,
        channel:'wx'
      }).then(function(res){
        var data = res.data.credential.wx
        function onBridgeReady(){
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              appId:data.appId,     //公众号名称，由商户传入
              timeStamp:String(data.timeStamp),         //时间戳，自1970年以来的秒数
              nonceStr:data.nonceStr, //随机串
              package:`prepay_id=${data.prepayId}`,
              signType:"MD5",         //微信签名方式：
              paySign:data.sign //微信签名
            },
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
          );
        }
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          onBridgeReady();
        }
      })
    },
    //goPay(){
    //  this.sheetVisible = true
    //},
    //payOrder(channel){
    //  if(channel){
    //    var self = this
    //    this.$store.dispatch('order/payOrder',{
    //      id:this.$route.params.id,
    //      coupon:this.coupon,
    //      channel:channel
    //    }).then(function(){
    //      self.$router.replace('/success')
    //    })
    //  }
    //}
  }
}
