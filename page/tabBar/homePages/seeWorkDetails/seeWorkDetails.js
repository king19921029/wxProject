
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
  // 工资详情
  goWageDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails',
    })
  },

})