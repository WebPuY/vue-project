// 列表需要的变量，用Object.assign添加到vue data里面
var queryParam = {
  listData: [],
  loading: true,
  loadingImg: true,
  isOver: false,
  noResult: false,
  pageNo: 1
}
// 公共列表查询函数
function search (url, page, self, param) {
  if (page && page === 1) {
    self.listData = []
    self.pageNo = 1
  } else {
    self.pageNo ++
  }
  self.loadingImg = true
  self.loading = true
  self.isOver = false
  self.noResult = false
  let obj = param || {}
  obj['currentPage'] = self.pageNo
  obj['everyPage'] = 10
  self.$http(url, obj, self, data => {
    self.loadingImg = false
    if (data.rows.length === 0 && Number(self.pageNo) === 1) {
      self.noResult = true
      self.loading = true
      self.isOver = false
      return
    } else {
      self.noResult = false
    }
    self.listData = self.listData.concat(data.rows)
    data.page.totalPage <= self.pageNo ? self.loading = true : self.loading = false
    data.page.totalPage <= self.pageNo ? self.isOver = true : self.isOver = false
  }, false, (err) => {
    err.success ? self.loadingImg = false : self.loadingImg = false
  })
}

module.exports.search = search
module.exports.queryParam = queryParam
