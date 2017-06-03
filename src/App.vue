<template>
  <div id="app">
    <transition :name="transitionName" @afterLeave="clearTransition">
      <router-view></router-view>
    </transition>
    <img v-if="!$route.meta.hideTab" id="download-bar" src="./assets/download_bar1@2x.png" @click="goDownload"/>
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
      <mt-tab-item id="cart">
        <div slot="icon" class="icon icon-cart"></div>
        购物袋
      </mt-tab-item>
      <mt-tab-item id="account">
        <div slot="icon" class="icon icon-account"></div>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<style lang="scss" src="@/stylesheets/App.scss"></style>

<script>
  export default {
    name: 'app',
    computed: {
      transitionName(){
        return this.$store.state.transition.transitionName
      },
      currentTab(){
        return this.$route.name
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

