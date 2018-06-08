export default {
  created () {
    let storage = this.$storage('custInfo')
    if (storage) {
      this.info = storage
    } else {
      this.$http('/wz/share/queryCustDetail', {}, this, res => {
        if (res.attr.hasOwnProperty('custInfo')) {
          let custInfo = res.attr.custInfo
          this.info = custInfo
          this.$storage('custInfo', JSON.stringify(custInfo))
        } else {
          this.$rmStorage('custInfo')
          this.notSet = true
        }
      })
    }
  }
}
