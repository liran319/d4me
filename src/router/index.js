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
import OrderDetailSuccessPage from '@/views/OrderDetailSuccessPage'
import FavoritePage from '@/views/FavoritePage'
import VoucherPage from '@/views/VoucherPage'
import ContactPage from '@/views/ContactPage'
import NewComePage from '@/views/NewComePage'
import AddressPage from '@/views/AddressPage'
import DownloadPage from '@/views/DownloadPage'
import NewAddressPage from '@/views/NewAddressPage'
import NewCouponPage from '@/views/NewCouponPage'
import CheckoutPage from '@/views/CheckoutPage'
import SuccessPage from '@/views/SuccessPage'

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
      path: '/articles',
      name: 'articles',
      component: CollectionPage,
      meta:{
        noPageAnimation:true
      }
    },
    {
      path: '/articles/:id',
      name: 'articles/detail',
      component: CollectionDetailPage,
      meta:{
        hideTab:true,
        bottom:0,
        sub:"articles"
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
      path: '/products',
      name: 'products',
      component: ProductPage,
      meta:{
        bottom:0,
        hideTab:true
      }
    },
    {
      path: '/products/:id',
      name: 'products/detail',
      component: ProductDetailPage,
      meta:{
        bottom:50,
        hideTab:true,
        sub:"products"
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
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
      component: OrderPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
      }
    },
    {
      path: '/order/:id',
      name: 'order/detail',
      component: OrderDetailPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:"order"
      }
    },
    {
      path: '/order/:id/success',
      name: 'order/success',
      component: OrderDetailSuccessPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:"order"
      }
    },
    {
      path: '/address',
      name: 'address',
      component: AddressPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
      }
    },
    {
      path: '/address/new',
      name: 'address_new',
      component: NewAddressPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'address'
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritePage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
      }
    },
    {
      path: '/voucher',
      name: 'voucher',
      component: VoucherPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
      }
    },
    {
      path: '/voucher/new',
      name: 'new_voucher',
      component: NewCouponPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'voucher'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
      }
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadPage,
      meta:{
        bottom:0,
        hideTab:true,
        isDownload:true,
        sub:'account'
      }
    },
    {
      path: '/newcome',
      name: 'newcome',
      component: NewComePage,
      meta:{
        bottom:0,
        hideTab:true,
        sub:'account'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessPage,
      meta:{
        bottom:0,
        hideTab:true
      }
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: CheckoutPage,
      meta:{
        bottom:0,
        hideTab:true
      }
    }
  ]
}), store);
