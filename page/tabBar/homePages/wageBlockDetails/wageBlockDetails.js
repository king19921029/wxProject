
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  peojectTap: function () {
    this.setData({
      selectStatus: 1
    })
  },
  companyTap: function () {
    this.setData({
      selectStatus: 2
    })
  },
  classTap: function () {
    this.setData({
      selectStatus: 3
    })
  },

})