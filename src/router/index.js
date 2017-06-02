import Vue from 'vue'
import Router from 'vue-router'
/* 页面列表 */
import HomePage from '@/views/HomePage'
import CategoryPage from '@/views/CategoryPage'
import CollectionPage from '@/views/CollectionPage'
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

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: HomePage
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryPage
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/product',
      name: 'product',
      component: ProductPage
    },
    {
      path: '/product/:id',
      name: 'product/detail',
      component: ProductDetailPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage
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
})
