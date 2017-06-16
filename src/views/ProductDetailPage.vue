<template>
  <Page id="product-detail-page" :style="{paddingTop:padding+'px',backgroundImage:'url('+product.image+')'}" :key="$route.params.id">
    <div class="loading-view" v-if="pending">
      <mt-spinner type="double-bounce" color="#DCB76B"></mt-spinner>
    </div>
    <div class="product-content">
      <div class="product-title">
        <div class="title">{{product.title}}</div>
        <div class="price">CN￥{{product.price}}</div>
        <div class="variants">
          尺码 {{variants}}
        </div>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab1">图文详情</mt-tab-item>
        <mt-tab-item id="tab2">购买须知</mt-tab-item>
      </mt-navbar>
      <div class="content" v-if="selected=='tab1'">
        <div class="item" v-for="item in product.photos" :key="item.id">
          <img class="image" :src="item.image"/>
        </div>
      </div>
      <div class="content notes" v-else>
        <div class="title">
          <div slot="icon" class="icon icon-safe"></div>
          <span>正品保障</span>
        </div>
        <div class="text">D4ME目前与⼏十家时尚品牌和买手店建立合作，所销售的产品均为正品。</div>
        <div class="title">
          <div slot="icon" class="icon icon-shipping"></div>
          <span>物流说明</span>
        </div>
        <div class="text">物品都将用顺丰快递发出，发货时间为2个工作日（特殊海外预订款除外）。</div>
        <div class="text">海外商品涉及到国际物流及清关等问题，一般需要10-20个工作日左右。如有疑问可添加D4ME客服:dressforme 咨询我们。</div>
        <div class="title">
          <div slot="icon" class="icon icon-sales"></div>
          <span>退换货说明</span>
        </div>
        <div class="text">⾮质量问题，不接受退货哦</div>
        <div class="text">如果出现尺码不合，请在签收后48小时内联系客服，我们将为您更换同款不同码的商品。</div>
        <div class="text">退回的商品必须无破损，无污渍，无穿着或使用痕迹。请保留吊牌完整，并用原包装退回。</div>
      </div>
      <div class="related-title"></div>
      <div class="related-product-list" v-masonry transition-duration="0" item-selector=".product-item">
        <div v-masonry-tile column-width=".product-item"  class="product-item" v-for="p in product.related" :key="product.id">
          <router-link :to="'/products/'+p.id">
            <img :src="p.image" :alt="p.title"/>
          </router-link>
          <div class="brand-title">{{p.brand&&p.brand.title}}</div>
          <div class="title">{{p.title}}</div>
          <div class="price">￥{{p.price}}</div>
        </div>
      </div>
    </div>
    <footer>
      <div class="left">
        <div class="button icon like">
          <like-button type="Product" :id="product.id" :active="product.fav"/>
          <span>收藏</span>
        </div>
      </div>
      <div class="right">
        <div class="button black" @click="showVariantPage()">加入购物车</div><!--
        --><div class="button gold" @click="showVariantPage(true)">立即购买</div>
      </div>
    </footer>
    <mt-popup v-model="showVariant" position="bottom">
      <div class="product-variant">
        <div class="info">
          <div class="image-wrapper">
            <div class="image" :style="{backgroundImage:'url('+product.image+')'}"/>
          </div>
          <div class="product-info">
            <div class="price">￥{{product.price}}</div>
            <div class="title">{{product.title}}</div>
            <div class="sub-title">{{subtitle}}</div>
          </div>
        </div>
        <div class="variant">
          <div class="title">尺码</div>
          <div class="variant-list">
            <div :class="{'variant-item':true, active:item.id == variant}" v-for="item in product.variants" @click="chooseVariant(item.id)">{{item.title}}</div>
          </div>
        </div>
        <div class="buy-count">
          <div class="title">购买数量</div>
          <quantity-editor :value="quantity" @change="quantity=$event"/>
        </div>
        <div class="button" @click="onConfirm">确定</div>
      </div>
    </mt-popup>
  </Page>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        goCheckout:false,
        showVariant:false,
        selected: "tab1",
        variant:null,
        padding:300,
        quantity:1
      }
    },
    computed: {
      pending(){
        return this.$store.state.product.pending
      },
      product(){
        return this.$store.state.product.data.product || {}
      },
      variants(){
        var variants = this.product.variants||[]
        return _.map(variants, function(item){return item.title}).join(' ')
      },
      subtitle(){
        if(!this.variant){
          return '请选择型号'
        }else{
          var variants = this.product.variants||[], self = this
          var item =  _.find(variants, function(item){return item.id == self.variant})
          return `已选择 ${item.title}`
        }
      }
    },
    methods:{
      fetch(){
        var self = this
        this.$store.dispatch('product/fetchOne',{
          id:this.$route.params.id
        }).then(function(){
          self.loadImage(self.product.image)
        })
      },
      loadImage(url){
        var self = this
        var image = new Image()
        var width = window.screen.width
        image.onload = function(){
          self.padding = image.height/image.width*width
        }
        image.src = url
      },
      showVariantPage(goCheckout){
        this.goCheckout = goCheckout
        this.variant = null
        this.quantity = 1
        this.showVariant = true
      },
      chooseVariant(id){
        this.variant = id
      },
      onConfirm(){
        var self = this
        if(this.variant){
          if(self.goCheckout){
            this.$store.dispatch('orders/quickOrder',{
              product_id:this.$route.params.id,
              variant_id: this.variant,
              quantity:this.quantity
            }).then(function(res){
              self.showVariant = false
              self.$router.push(`/checkout/${res.data.order.id}/`)
            })
          }else{
            this.$store.dispatch('cart/add_item',{
              product_id:this.$route.params.id,
              variant_id: this.variant,
              quantity:this.quantity
            }).then(function(){
              Toast('成功加入购物车!')
              self.showVariant = false
            })
          }
        }else{
          Toast('请选择尺码!')
        }
      }
    },
    mounted(){
      this.fetch()
    },
    beforeDestroy(){
      this.$store.commit('product/reset')
    },
    watch:{
      $route(){
        this.fetch()
      },
      showVariant(value){
        if(!value){
          this.variant = null
          this.quantity = 1
        }
      }
    }
  }
</script>
