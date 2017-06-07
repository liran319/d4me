<template>
  <div>
    <div id="app" v-if="ready">
      <transition :name="transitionName" @afterLeave="clearTransition">
        <router-view></router-view>
      </transition>
      <img id="download-bar" src="./assets/download_bar1@2x.png" @click="goDownload" :style="{bottom:(typeof $route.meta.bottom == 'number'?$route.meta.bottom:55)+'px'}"/>
      <mt-tabbar v-if="!$route.meta.hideTab" :value="currentTab" @input="onTabChange">
        <mt-tab-item id="home">
          <div slot="icon" class="icon icon-home"></div>
          首页
        </mt-tab-item>
        <mt-tab-item id="category">
          <div slot="icon" class="icon icon-category"></div>
          分类
        </mt-tab-item>
        <mt-tab-item id="collection">
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
  export default {
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
      const authIgnores = /^\/(login|forgot_password|password\/reset)\/?$/
      if (!authIgnores.test(window.location.pathname)) {
        this.$store.dispatch('users/fetch_global_info')
      }else{
        this.$store.commit('users/ready')
      }
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
        console.log('download')
      }
    }
  };
</script>

