export default {
  beforeCreate () {
    let signId = this.$route.query.signId
    if (signId) {
      this.$storage('signId', signId)
    } else {
      let strCookie = document.cookie
      let arrCookie = strCookie.split(';')
      for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split('=')
        if (arr[0].indexOf('signId') !== -1) {
          this.$storage('signId', arr[1])
        }
      }
    }
  }
}
