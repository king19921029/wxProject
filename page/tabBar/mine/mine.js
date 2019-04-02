
Page({
  data: {
    blockIsShow:false
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  //实名认证
  goAuthentication:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/authentication/authentication',
    })
  },
  // 我的项目
  goMyProject: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/myProject/myProject',
    })
  },
  // 个人资料
  goPersonData: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/personData/personData',
    })
  },
  
})