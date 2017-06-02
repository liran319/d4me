export const define = ( ...mixins)=>{
  var state = {}, actions = {}, mutations = {}
  for(var mixin of mixins){
    state = Object.assign(state, mixin.state)
    actions = Object.assign(actions, mixin.actions)
    mutations = Object.assign(mutations, mixin.mutations)
  }
  return {
    namespaced: true,
    state,
    actions,
    mutations
  }
}
