var app = getApp();
Page({
  data: {
    blockIsShow:false,
    mineData:{},//个人信息
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/myInfo",
      { },
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            mineData:res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  // 头像点击
  photoTap:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/authenticationAll/authenticationAll',
    })
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