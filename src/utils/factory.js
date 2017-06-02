var events_list = {}

export const getTypes = (storeName)=>{
  return events_list[storeName]
}

export const getEvents = (storeName, list)=>{
  var results = {}
  for(var name of list){
    results[name] = `${storeName}/${name}`;
  }
  return results
}

export const define = (storeName, ...mixins)=>{
  var state = {}, actions = {}, mutations = {}, events = {}
  for(var mixin of mixins){
    var module = mixin(storeName)
    state = Object.assign(state, module.state)
    actions = Object.assign(actions, module.actions)
    mutations = Object.assign(mutations, module.mutations)
    events = Object.assign(events, module.events)
  }
  events_list[storeName] = events
  return {
    state,
    actions,
    mutations
  }
}
