
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {

  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: "动态设置的标题"
    })
  },
  onHide: function () {

  },

  //查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails',
    })
  },

})