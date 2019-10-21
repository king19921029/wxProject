
Page({
  data: {
    blockIsShow: false
  },
  onLoad: function (options) {
    this.setData({
      types: options.types
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
  go_home(){
    wx.switchTab({
      url: '/page/tabBar/home/home'
    })
  }

})