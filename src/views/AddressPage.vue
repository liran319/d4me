<template>
  <Page id="address-page">
    <mt-header title="地址管理">
      <mt-button icon="back" slot="right"></mt-button>
    </mt-header>
    <div class="content">
      <div class="title">邮寄</div>
      <div class="address-list">
        <div class="address-item" v-for="item in address" :key="item.id">
          <div class="header">
            <checkbox :selected="item.default" label="默认地址"/>
            <div class="action">删除</div>
          </div>
          <div class="content">
            <div>{{item.name}} {{item.phone}}</div>
            <div>{{item.province}} {{item.city}} {{item.street}}</div>
          </div>
        </div>
      </div>
      <div class="title">线下自取</div>
      <div class="address-item">
        <div class="content">
          <div>D4ME</div>
          <div>门店自取</div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
  import page from '@/mixins/page'

  export default {
    mixins:[page],
    data(){
      return {
        storeName:'address'
      }
    },
    computed: {
      address(){
        return this.$store.state.address.data.addresses || []
      }
    },
    methods:{
    },
    beforeDestroy(){
      this.$store.commit('address/reset')
    }
  }
</script>
