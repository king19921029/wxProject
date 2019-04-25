var app = getApp();
Page({
  data: {
    blockIsShow: false
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/idAuthCenter",
      {},
      "post", function (res) {
        console.log("个人信息：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            mineData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
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