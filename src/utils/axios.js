import axios from 'axios'
import url from 'url'
import { Toast } from 'mint-ui';

var parser = url.parse(location.href)

if(parser.query&&/token\=(.*)&?/.test(parser.query)){
  const auth_token = RegExp.$1
  localStorage.setItem("auth_token", auth_token)
}

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

