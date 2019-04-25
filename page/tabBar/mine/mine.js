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
    let token = wx.getStorageSync("token");
    if ( token ){
      app.wxRequest("gongguan/api/wechat/myInfo",
        {},
        "post", function (res) {
          console.log(res.data.data)
          if (res.data.code == 0) {
            if (res.data.data.isAuth == "0"){
              that.setData({
                mineData: res.data.data,
                blockIsShow:true
              })
            }else{
              that.setData({
                mineData: res.data.data,
                blockIsShow: false
              })
            }
            
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      wx.redirectTo({
        url: '/page/tabBar/login/login',
      })
    }
    
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
  // 紧急联系人
  goContacts:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/contacts/contacts',
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
  // 信息反馈
  goFeedback:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/feedback/feedback',
    })
  },
  // 稍后认证
  closeTap:function(){
    this.setData({
      blockIsShow:false
    })
  },
  //退出
  eixt:function(){
    wx.removeStorageSync("token");
    app.globalData.header.authorization = "";
    app.globalData.token = "";
    wx.redirectTo({
      url: '/page/tabBar/login/login',
    })
  }
  
})