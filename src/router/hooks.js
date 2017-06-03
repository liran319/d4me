var prevRoutes = []

export default function (router, $store) {
  router.afterEach(function (route) {

  })

  router.beforeEach(function (to, from, next) {
    if (!(to.meta.noPageAnimation || from.meta.noPageAnimation)||(to.meta.sub||from.meta.sub)) {
      if(to.meta.sub&&prevRoutes.length==0){
        prevRoutes.push(to.meta.sub);
      }
      if (to.name === prevRoutes[ prevRoutes.length - 1 ]) {
        $store.commit('transition/setTransition', 'page-out');
        prevRoutes.pop();
      } else {
        if (from.name != null) {
          $store.commit('transition/setTransition', 'page-in');
          prevRoutes.push(from.name);
        }
      }
    }
    next()
  })
  return router
}
