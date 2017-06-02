<template>
    <div class="page">
      <slot></slot>
      <mt-tabbar :value="currentTab">
        <mt-tab-item id="tab1">
          <!--<img slot="icon" src="../assets/100x100.png">-->
          首页
        </mt-tab-item>
        <mt-tab-item id="tab2">
          <!--<img slot="icon" src="../assets/100x100.png">-->
          分类
        </mt-tab-item>
        <mt-tab-item id="tab3">
          <!--<img slot="icon" src="../assets/100x100.png">-->
          专题
        </mt-tab-item>
        <mt-tab-item id="tab4">
          <!--<img slot="icon" src="../assets/100x100.png">-->
          购物袋
        </mt-tab-item>
        <mt-tab-item id="tab5">
          <!--<img slot="icon" src="../assets/100x100.png">-->
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
