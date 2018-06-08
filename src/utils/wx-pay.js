const plugin = {
  install (Vue) {
    function wxPay (payParams, urlType) {
      let that = this
      window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
        'appId': payParams.appId + '',
        'timeStamp': payParams.timeStamp + '',
        'nonceStr': payParams.nonceStr + '',
        'package': 'prepay_id=' + payParams.prepayId,
        'signType': 'MD5',
        'paySign': payParams.sign + ''
      }, function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          that.$messagebox('提示', '支付成功！')
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          that.$messagebox('提示', '微信支付失败')
        }
      })
    }
    Vue.prototype.$wxPay = wxPay
  }
}

export default plugin
