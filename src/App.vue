<template>
  <div :class="{ios:is_ios}">
    <div id="app" v-if="ready">
      <transition :name="transitionName" @afterLeave="clearTransition">
        <router-view></router-view>
      </transition>
      <img v-if="is_ios&&!$route.meta.isDownload" id="download-bar" src="./assets/download_bar1@2x.png" @click="goDownload" :style="{bottom:(typeof $route.meta.bottom == 'number'?$route.meta.bottom:55)+'px'}"/>
      <mt-tabbar v-if="!$route.meta.hideTab" :value="currentTab" @input="onTabChange">
        <mt-tab-item id="home">
          <div slot="icon" class="icon icon-home"></div>
          首页
        </mt-tab-item>
        <mt-tab-item id="category">
          <div slot="icon" class="icon icon-category"></div>
          分类
        </mt-tab-item>
        <mt-tab-item id="articles">
          <div slot="icon" class="icon icon-collection"></div>
          专题
        </mt-tab-item>
        <mt-tab-item id="account">
          <div slot="icon" class="icon icon-account"></div>
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <div id="global-loading" v-else>loading...</div>
  </div>
</template>

<style lang="scss" src="@/stylesheets/App.scss"></style>

<script>
  import axios from 'axios'

  export default {
    data(){
      var is_ios = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      return {
        is_ios: is_ios
      }
    },
    computed: {
      ready(){
        return this.$store.state.users.ready
      },
      transitionName(){
        return this.$store.state.transition.transitionName
      },
      currentTab(){
        return this.$route.name
      }
    },
    mounted:function(){
      //微信登陆
      if(localStorage.getItem('auth_token')||this.$route.query.token){
        const auth_token = this.$route.query.token||localStorage.getItem('auth_token')
        localStorage.setItem('auth_token', auth_token)
        this.$store.commit('users/set_token', {
          auth_token: auth_token
        })
        this.$store.dispatch('users/fetch_user_info')
      }
      this.$store.dispatch('users/fetch_global_info')
    },
    methods: {
      //清除动画
      clearTransition() {
        this.$store.commit('transition/setTransition', '');
      },
      onTabChange(value){
        this.$router.push(`/${value=='home'?'':value}`)
      },
      goDownload(){
        this.$router.push('/download')
      }
    }
  };
</script>

