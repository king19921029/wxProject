
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
  listTap: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject',
    })
  }

})