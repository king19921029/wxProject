
Page({
  data: {
    blockIsShow: false
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 个人资料
  goPersonData: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/personData/personData',
    })
  },
  //实名认证
  goAuthentication: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/authentication/authentication',
    })
  },
  // 修改人像照片
  goChagngePhoto:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/changePhoto/changePhoto',
    })
  }
})