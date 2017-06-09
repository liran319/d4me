<template>
  <Page id="cart-page">
    <div class="cart-list">
      <mt-cell-swipe class="cart-item" v-for="item in cart" :key="item.id" :right="[{content: '删除', handler: removeCartItem.bind(this, item.product_id, item.variant_id)}]">
        <checkbox :selected="is_selected(item.id)" @change="toggleSelection($event, item.id)"/>
        <div class="product">
          <div class="image" :style="{backgroundImage:'url('+item.product_image+')'}"/>
          <div class="info">
            <div class="line">
              <div class="title">{{item.product_title}}</div>
              <div class="price">￥{{item.product_price}}</div>
            </div>
            <div class="variants">尺码: {{item.variant_title}}</div>
            <div class="quantity">数量: <quantity-editor v-model="item.quantity" @change="updateQuantity($event, item.product_id, item.variant_id)"/></div>
          </div>
        </div>
      </mt-cell-swipe>
    </div>
    <footer>
      <checkbox label="全选" @change="toggleFullSelection" :selected="is_all"/>
      <div class="info">
        总金额: <span class="price">￥{{total_price}}</span>
      </div>
      <div class="button">结算</div>
    </footer>
  </Page>
</template>

<script>
  import page from '@/mixins/page'

  export default {
    mixins:[page],
    data(){
      return {
        value:[],
        selected:[],
        storeName:'cart'
      }
    },
    computed: {
      all_selected(){
        return this.cart.map(function(item){
          return item.id
        })||[]
      },
      is_all(){
        return this.all_selected.length == this.selected.length
      },
      total_price(){
        var price = 0, self = this
        _.forEach(this.cart, function(item){
          if(self.is_selected(item.id)){
            price+= parseFloat(item.product_price) * item.quantity
          }
        })
        return price.toFixed(1)
      },
      cart(){
        return this.$store.state.cart.data.order_items || []
      }
    },
    methods:{
      removeCartItem(product_id, variant_id){
        var self = this
        this.$store.dispatch('cart/remove_item',{
          product_id: product_id,
          variant_id: variant_id
        }).then(function(){
          self.fetchData()
        })
      },
      updateQuantity(value, product_id, variant_id){
        this.$store.dispatch('cart/set_item',{
          product_id: product_id,
          variant_id: variant_id,
          quantity: value
        })
      },
      is_selected(id){
        return _.includes(this.selected, id)
      },
      toggleFullSelection(value){
        this.selected = value?this.all_selected:[]
      },
      toggleSelection(value, id){
        var position = _.findIndex(this.selected, function(item){
          return item == id
        })
        if(value){
          if(position<0){
            this.selected.push(id)
          }
        }else{
          this.selected.splice(position, 1)
        }
      }
    },
    watch:{
      cart(){
        this.selected = _.cloneDeep(this.all_selected)
      }
    },
    beforeDestroy(){
      this.$store.commit('cart/reset')
    }
  }
</script>
