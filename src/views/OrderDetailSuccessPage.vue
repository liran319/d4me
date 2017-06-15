<template>
  <Page id="order-detail-success-page">
    <div class="content">
      <div class="price">{{order.final_price}}元</div>
      <div class="title">支付成功</div>
      <div class="divider"></div>
      <div class="text">
        感谢您对D4ME的支持与信任，为后续提供更优质的服务
        烦请您留下联系方式，同时您将享受D4ME新品推荐、
        专属折扣、造型搭配等更多服务。
      </div>
      <footer>
        <div class="form">
          <div class="field">
            <input type="mobile" placeholder="请输入您的手机号" v-model="phone"/>
          </div>
          <div class="field">
            <input type="text" placeholder="请输入验证码" v-model="code"/>
            <div :class="{button:true, disabled:timer>0}" @click="getCode">{{timer>0?'重新发送('+timer+'s)':'获取验证码'}}</div>
          </div>
        </div>
        <div class="button" @click="goOrders">确认</div>
      </footer>
    </div>
  </Page>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        phone:'',
        code:'',
        timer:0
      }
    },
    computed: {
      pending(){
        return this.$store.state.order.pending
      },
      order(){
        return this.$store.state.order.data.order || {}
      }
    },
    methods: {
      fetch(){
        this.$store.dispatch('order/fetchOne', {
          id: this.$route.params.id
        })
      },
      goOrders(){
        if(this.phone&&this.code){
          var self = this
          this.$store.dispatch('users/send_info',{
            name:'pay_order_success',
            content:JSON.stringify({
              mobile:this.mobile,
              code:this.code
            })
          }).then(function(){
            self.$router.replace('/order')
          })
        }else{
          Toast('请填写验证码')
        }
      },
      getCode(){
        if(this.phone){
          var self = this
          this.$store.dispatch('users/send_code',{
            phone:this.phone
          }).then(function(){
            self.startTimer()
          })
        }else{
          Toast('请输入手机号!')
        }
      },
      startTimer(){
        this.timer = 61;
        this.startCount()
      },
      startCount(){
        if(this.timer>0){
          this.timer--;
          setTimeout(this.startCount,1000)
        }
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('order/reset')
    }
  }
</script>
