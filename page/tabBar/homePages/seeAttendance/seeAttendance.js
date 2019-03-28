
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
  // 项目
  peojectTap: function () {
    this.setData({
      selectStatus: 1
    })
  },
  // 劳务公司
  companyTap: function () {
    this.setData({
      selectStatus: 2
    })
  },
  // 班组
  classTap: function () {
    this.setData({
      selectStatus: 3
    })
  },
  // 查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceDetails/attendanceDetails',
    })
   
  },
  

})