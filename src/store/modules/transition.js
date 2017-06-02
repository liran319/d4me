export default {
  namespaced: true,
  state: {
    transitionName: '',
    action: []
  },
  mutations: {
    setTransition(state, transition) {
      state.transitionName = transition;
    }
  }
}
