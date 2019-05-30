var app = getApp();
Page({
  data: {
    blockIsShow:false,
    mineData:{},//个人信息
  },
  onLoad: function (options) {
    var tel = app.globalData.userPhone;
    tel = "" + tel;
    var userPhone = tel.replace(tel.substring(3, 7), "****")
    this.setData({
      userPhone: userPhone
    })
  },
  onShow: function () {
    var that = this;
    let token = wx.getStorageSync("token");
    if ( token ){
      // 个人信息
      app.wxRequest("gongguan/api/wechat/myInfo",
        {},
        "post", function (res) {
          app.globalData.name = res.data.data.realName
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
      // 获取银行卡
      app.wxRequest("gongguan/api/wechat/getBankCard",
        {},
        "post", function (res) {
          console.log("银行卡：", res.data.data)
          if (res.data.code == 0) {
            var data = res.data.data;
            that.setData({
              bankData: data
            })
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
  bindbank:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/bindBankCard/bindBankCard',
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
  // 我的求职
  goWorkWanted: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/workWanted/workWanted',
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