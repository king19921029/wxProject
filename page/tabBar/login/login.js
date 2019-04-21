var app = getApp();
Page({
  data: {
    blockIsShow: false,
    photoBtn:true
  },
  onLoad: function (options) {

  },
  onShow: function () {
   
  },
  onHide: function () {
    
  },
  getCode:function(e){
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          app.wxRequest("gongguan/api/wechat/getOpenIdByCode",
            { code: res.code },
            "post", function (res) {
              console.log("openid:",res)
              app.globalData.header.openId = res.data.data;
              console.log(app.globalData.header)
              if (res.data.code == 0) {
                that.setData({
                  photoBtn:false
                })
              } else {
                app.showLoading(res.data.msg, "none");
              }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    app.wxRequest("gongguan/api/wechat/login",
      { phone: this.data.userPhone, verificationCode: "111111" },
      "post", function (res) {
        console.log(res)
        if (res.data.code == 0) {
          app.globalData.header.authorization = res.data.data
          wx.setStorageSync("token", res.data.data)
          wx.switchTab({
            url: '/page/tabBar/home/home'
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  getPhone:function(e){
    console.log(e)
    this.setData({
      userPhone: e.detail.value
    })
  }
})