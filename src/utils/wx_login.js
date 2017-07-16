export default function(){
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b486ab603b7f0a7&redirect_uri=http://app.d4me.com/api/v1/users/wx_login_code&response_type=code&scope=snsapi_userinfo'
  if(/^\/products\/(\d+)/.test(window.location.pathname)){
    url+=`&state=product_id-${RegExp.$1}`
  }
  url+='#wechat_redirect'
  window.location.href = url
}
