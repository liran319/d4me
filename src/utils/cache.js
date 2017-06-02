export const setCache = function (key, value) {
  if (typeof value == 'object' || typeof value == 'array') {
    return localStorage.setItem(key, JSON.stringify(value))
  } else {
    return localStorage.setItem(key, value)
  }
}

export const removeCache = function (key) {
  return localStorage.removeItem(key)
}

export const getCache = function (key) {
  var cache = localStorage.getItem(key);
  var result = null
  try {
    result = JSON.parse(cache)
  }catch(e){
    result = cache
  }
  return result
}
