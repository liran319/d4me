<template>
  <Page id="address-page">
    <mt-header title="地址管理">
      <mt-button icon="back" slot="right" @click="addAddress"></mt-button>
    </mt-header>
    <div class="content">
      <div class="title">邮寄</div>
      <div class="address-list">
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

      },
      onSelectPickUp(){

      }
    }
  }
</script>
