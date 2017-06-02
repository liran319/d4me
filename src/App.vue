<template>
  <div id="app">
    <transition :name="transitionName" @afterLeave="clearTransition">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<style lang="scss" src="@/stylesheets/App.scss"></style>

<script>
  /* ======================================================
   *						App 组件
   *	在这里执行对于页面的切换效果
   *	原理简介：
   *		在这里对于页面之间的切换采用将路由堆栈
   *		的方法而不是类似子路由这样的根据路由长度来
   *		判断页面是切入还是切出，由此会导致如果刷新当前
   *		页面将会导致堆栈刷新，但是对于在App环境中不存在
   *		主动的页面刷新，因此也不存在这种问题。
   *		基本原理是每次路由切换将其堆入一个栈，最多存下两个路由
   *		根据栈的长度判断是否切入还是切出，并在每次切换完成清除动画
   *		Route 动画由Vuex Transition 储存
   * ===================================================== */
  import "mint-ui/lib/style.min.css";

  export default {
    name: 'app',
    data() {
      return {
        selected:'tab1',
        prevRoutes: []
      }
    },
    watch: {
      $route(to, from) {
        if (!(to.meta.noPageAnimation || from.meta.noPageAnimation)) {
          if (to.name === this.prevRoutes[ this.prevRoutes.length - 1 ]) {
            this.$store.commit('transition/setTransition', 'turn-off');
            this.prevRoutes.pop();
          } else {
            if (from.name != null) {
              this.$store.commit('transition/setTransition', 'turn-on');
              this.prevRoutes.push(from.name);
            }
          }
        }
      }
    },
    computed: {
      transitionName(){
        return this.$store.state.transitionName
      }
    },
    methods: {
      // Clear Transition Effects After Each Switch
      clearTransition() {
        this.$store.commit('transition/setTransition', '');
      }
    }
  };
</script>

