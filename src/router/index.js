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
import FavoritePage from '@/views/FavoritePage'
import VoucherPage from '@/views/VoucherPage'
import NotificationPage from '@/views/NotificationPage'
import SettingPage from '@/views/SettingPage'
import SettingNamePage from '@/views/SettingNamePage'
import SettingMobilePage from '@/views/SettingMobilePage'
import SettingContactPage from '@/views/SettingContactPage'

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
      meta:{
        hideDownload:true
      }
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
        sub:"collection",
        hideTab:true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      meta:{
        sub:'home',
        hideTab:true
      }
    },
    {
      path: '/product',
      name: 'product',
      component: ProductPage,
      meta:{
      hideTab:true
      }
    },
    {
      path: '/product/:id',
      name: 'product/detail',
      component: ProductDetailPage,
      meta:{
        sub:"product",
        hideTab:true
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
        noPageAnimation:true,
        hideDownload:true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage
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
      path: '/notification',
      name: 'notification',
      component: NotificationPage
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingPage
    },
    {
      path: '/setting/name',
      name: 'setting/name',
      component: SettingNamePage
    },
    {
      path: '/setting/mobile',
      name: 'setting/mobile',
      component: SettingMobilePage
    },
    {
      path: '/setting/contact',
      name: 'setting/contact',
      component: SettingContactPage
    }
  ]
}), store);
