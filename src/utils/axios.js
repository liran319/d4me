import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://app.d4me.com/api/v1'
})
//
//const authIgnores = /^\/admin\/(login|forgot_password|password\/reset)\/?$/
//
//function goToLogin(){
//  window.localStorage.clear()
//  if (!authIgnores.test(window.location.pathname)) {
//    window.location.pathname = '/admin/login/'
//  }
//}
//
////判断是否已有Token
//if (config.ACCESS_TOKEN) {
//  Axios.defaults.headers.Authorization = 'Bearer ' + config.ACCESS_TOKEN
//} else{
//  goToLogin()
//}

Axios.interceptors.response.use(null, function (e) {
  var res = e.response.data
  var error_message = res.non_field_errors && res.non_field_errors[0]||res.detail
  if(error_message){
    //notification.error(error_message)
  }
  if (res.status == 403 || res.status == 401) {
    //未登录
    //goToLogin()
    return Promise.reject(res)
  }
  else if (res.status == 493) {
    //没有套餐权限
  }
  return Promise.reject(e)
})

export default Axios

