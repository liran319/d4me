<template>
    <div class="page">
      <slot></slot>
      <mt-tabbar :value="currentTab">
        <mt-tab-item id="tab1">
          <img slot="icon" src="../assets/home@2x.png"/>
          首页
        </mt-tab-item>
        <mt-tab-item id="tab2">
          <img slot="icon" src="../assets/category@2x.png"/>
          分类
        </mt-tab-item>
        <mt-tab-item id="tab3">
          <img slot="icon" src="../assets/collection@2x.png"/>
          专题
        </mt-tab-item>
        <mt-tab-item id="tab4">
          <img slot="icon" src="../assets/cart@2x.png"/>
          购物袋
        </mt-tab-item>
        <mt-tab-item id="tab5">
          <img slot="icon" src="../assets/account@2x.png"/>
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          currentTab:'tab1'
        }
      }
    }
</script>
