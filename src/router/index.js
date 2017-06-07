import Vue from 'vue'
import Router from 'vue-router'
import hooks from './hooks'
import store from '../store'
/* 页面列表 */
import HomePage from '@/views/HomePage'
import CategoryPage from '@/views/CategoryPage'
import CollectionPage from '@/views/CollectionPage'
import CollectionDetailPage from '@/views/CollectionDetailPage'
import SearchPage from '@/views/SearchPage'
import AccountPage from '@/views/AccountPage'
import ProductPage from '@/views/ProductPage'
import ProductDetailPage from '@/views/ProductDetailPage'
import CartPage from '@/views/CartPage'
import OrderPage from '@/views/OrderPage'
import OrderDetailPage from '@/views/OrderDetailPage'
import FavoritePage from '@/views/FavoritePage'
import VoucherPage from '@/views/VoucherPage'
import ContactPage from '@/views/ContactPage'
import NewComePage from '@/views/NewComePage'

Vue.use(Router)

export default hooks(new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: HomePage,
      meta:{
        noPageAnimation:true
      }
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryPage,
      meta:{}
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionPage,
      meta:{
        noPageAnimation:true
      }
    },
    {
      path: '/collection/:id',
      name: 'collection_detail',
      component: CollectionDetailPage,
      meta:{
        hideTab:true,
        bottom:0,
        sub:"collection"
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      meta:{
        hideTab:true,
        bottom:0,
        sub:'home'
      }
    },
    {
      path: '/product',
      name: 'product',
      component: ProductPage,
      meta:{
        bottom:0,
        hideTab:true
      }
    },
    {
      path: '/product/:id',
      name: 'product/detail',
      component: ProductDetailPage,
      meta:{
        bottom:50,
        hideTab:true,
        sub:"product"
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta:{
        noPageAnimation:true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage,
      meta:{
        noPageAnimation:true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage
    },
    {
      path: '/order/:id',
      name: 'order/detail',
      component: OrderDetailPage,
      meta:{
        sub:"order"
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritePage
    },
    {
      path: '/voucher',
      name: 'voucher',
      component: VoucherPage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/newcome',
      name: 'newcome',
      component: NewComePage
    }
  ]
}), store);
