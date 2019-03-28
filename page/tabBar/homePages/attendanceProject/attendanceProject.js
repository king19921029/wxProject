
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态设置的标题"
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 查看-班组
  goCard: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceCard/attendanceCard',
    })
  }

})