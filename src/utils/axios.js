import axios from 'axios'
import { Toast } from 'mint-ui';

const Axios = axios.create({
  baseURL: 'http://app.d4me.com/api/v1'
})

Axios.interceptors.response.use(null, function (e) {
  var res = e.response.data
  if(res.message){
    Toast(res.message)
  }else{
    Toast("未知错误")
  }
  return Promise.reject(e)
})

export default Axios

