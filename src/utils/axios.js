import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://app.d4me.com/api/v1'
})

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

