import serialize from './serialize'
function http (Vue, axios) {
  if (!axios) {
    console.error('You have to install axios')
    return
  }
  /**
   * [description] post请求
   * @param  {[type]}   url   [description] 请求地址
   * @param  {[type]}   data  [description] 请求参数
   * @param  {[type]}   self  [description] 上下文对象
   * @param  {Function} cb    [description] 成功回调
   * @param  {[type]}   flag  [description] 是否添加 `signId` 参数
   * @param  {[type]}   errCb [description] 错误回调
   * @return {[type]}         [description]
   */
  Vue.prototype.$baseURL = axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? '/' : 'https://www.baidu.com/'
  Vue.prototype.$busiURL = 'https://192.168.0.1/'
  Vue.prototype.$axios = window.$axios = axios.post
  Vue.prototype.$http = (url, data, self, cb, flag, errCb) => {
    if (typeof url !== 'string' || typeof data !== 'object' || (!self.hasOwnProperty('$el') && !self.hasOwnProperty('$root')) || Object.prototype.toString.call(cb) !== '[object Function]') {
      console.error('params hava a big problem!')
      return
    }
    if (self.$storage('signId')) {
      if (!flag) data['signId'] = self.$storage('signId')
    }
    axios.post(url, serialize(data)).then(res => {
      if (res.headers.signid === 'needJoin') {
        self.$router.replace('/setCard')
        return
      }
      if (res.headers.signid === 'needLogin') {
        self.$router.replace('/setCard')
        return
      }
      self.$storage('signId', res.headers.signid)
      if (res.data.success) {
        cb(res.data)
      } else {
        if (errCb && Object.prototype.toString.call(errCb) === '[object Function]') {
          errCb(res.data)
        } else if (res.data.message) {
          self.$toast(res.data.message)
        }
        // else {
        //   self.$toast('网络异常')
        // }
      }
    })
  }
}

export default http
