<template>
  <Page id="address-page">
    <mt-header title="地址管理">
      <i class="icon icon-plus" slot="right" @click="addAddress"></i>
    </mt-header>
    <div class="content">
      <div class="title" v-if="addresses&&addresses.length">邮寄</div>
      <div class="address-list" v-if="addresses&&addresses.length">
        <div class="address-item" v-for="item in addresses" :key="item.id">
          <div class="header">
            <checkbox :selected="item.default" label="默认地址" @change="setDefaultAddress(item.id)"/>
            <div class="action" @click="removeAddress(item.id)">删除</div>
          </div>
          <div class="content" @click="onSelectAddress(item.id)">
            <div>{{item.name}} {{item.phone}}</div>
            <div>{{item.province}} {{item.city}} {{item.street}}</div>
          </div>
        </div>
      </div>
      <div class="title">线下自取</div>
      <div class="address-item">
        <div class="content" @click="onSelectPickUp">
          <div>D4ME</div>
          <div>门店自取</div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
  import { Toast } from 'mint-ui';
  import page from '@/mixins/page'

  export default {
    mixins:[page],
    data(){
      return {
        storeName:'addresses'
      }
    },
    computed: {
      addresses(){
        return this.$store.state.addresses.data.addresses || []
      }
    },
    methods:{
      addAddress(){
        this.$router.push('/address/new')
      },
      removeAddress(id){
        var self = this
        this.$store.dispatch('addresses/removeAddress',{
          id:id
        }).then(function(){
          Toast('删除成功')
          self.fetchData()
        })
      },
      setDefaultAddress(id){
        _.forEach(this.addresses, function(item){
          item.default = item.id == id
        })
        this.$store.dispatch('addresses/setDefaultAddress',{
          id:id
        })
      },
      onSelectAddress(id){
        if(this.$route.query.checkout){
          var self = this
          this.$store.dispatch('orders/updateOrder',{
            id:this.$route.query.checkout,
            address_id: id,
            order_type: 'online'
          }).then(function(){
            self.$router.back()
          })
        }
      },
      onSelectPickUp(){
        if(this.$route.query.checkout){
          var self = this
          this.$store.dispatch('orders/updateOrder',{
            id:this.$route.query.checkout,
            order_type: 'offline'
          }).then(function(){
            self.$router.back()
          })
        }
      }
    }
  }
</script>
