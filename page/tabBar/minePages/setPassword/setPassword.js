
var util = require('../../../../util/encrypt.js');
var app = getApp();
Page({
  data: {
    init_font:"为了保证你正常使用功能，请设置确认密码",
    isRet: false
  },
  onLoad: function (options) {
    if ( options.type  ){
      this.setData({
        init_font:"手机验证成功，请设置新的确认密码",
        isRet: true,
        code:options.code
      })
      wx.setNavigationBarTitle({
        title: "找回确认密码"
      })
    }
  },
  onShow: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/getIndex",
      {},
      "post", function (res) {
        console.log("getIndex", res.data.data)
        if (res.data.code == 0) {
          let token = app.globalData.token;
          that.setData({
            getIndex:res.data.data,
            token: token
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  getval1: function (e) {
    this.setData({
      val1: e.detail.value
    })
  },
  getval2:function(e){
    this.setData({
      val2: e.detail.value
    })   
  },
  next:function(){
    var that = this;
    let val1 = that.data.val1;
    let val2 = that.data.val2;
    const data = that.data.getIndex;
    const token = that.data.token;
    const key = app.getKey(data.token);
    console.log(key)
    if ( val1 && val2) {
      let password1 = util.encrypt(key, val1)
      let password2 = util.encrypt(key, val2)
      app.globalData.header.password1 = password1
      app.globalData.header.password2 = password2
      app.wxRequest("gongguan/api/wechat/setPassword",
        {},
        "post", function (res) {
          if (res.data.code == 0) {
            wx.navigateTo({
              url: '/page/tabBar/minePages/personData/personData'
            })
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      app.showLoading("每项都需要填写", "none")
    }
  },
  ret_next:function(){
    var that = this;
    let val1 = that.data.val1;
    let val2 = that.data.val2;
    const data = that.data.getIndex;
    const token = that.data.token;
    const key = app.getKey(data,token);
    console.log(key)
    if (val1 && val2) {
      let password1 = util.encrypt(key, val1)
      let password2 = util.encrypt(key, val2)
      app.globalData.header.newPassword1 = password1
      app.globalData.header.newPassword2 = password2
      app.globalData.header.verificationCode = that.data.code
      app.wxRequest("gongguan/api/wechat/resetPassword2",
        {},
        "post", function (res) {
          if (res.data.code == 0) {
            wx.navigateTo({
              url: '/page/tabBar/minePages/personData/personData'
            })
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      app.showLoading("每项都需要填写", "none")
    }
    
  }
})