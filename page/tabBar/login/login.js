var app = getApp();
Page({
  data: {
    blockIsShow: false,
    photoBtn: true
  },
  onLoad: function (options) {
    let token = wx.getStorageSync("token");
    if (token){
      wx.switchTab({
        url: '/page/tabBar/home/home',
      })
    }
    console.log(app.globalData.openId)
  },
  onShow: function () {

  },
  onHide: function () {

  },
  getCode: function (e) {
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          app.wxRequest("gongguan/api/wechat/getOpenIdByCode",
            { code: res.code },
            "post", function (res) {
              console.log("openid:", res)
              app.globalData.openId = res.data.data.openId;
              app.globalData.header.openId = res.data.data.openId;
              that.setData({
                session_key: res.data.data.session_key
              })

              if (res.data.code == 0) {
                that.setData({
                  photoBtn: false
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
    //获取用户手机号
    app.wxRequest("gongguan/api/wechat/getWechatPhone",
      { 
        session_key: this.data.session_key, 
        encryptedData: e.detail.encryptedData, 
        iv: e.detail.iv 
      },
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          let data = JSON.parse(res.data.data);
          console.log(data)
          app.globalData.userPhone = data.phoneNumber;
          wx.setStorageSync("userPhone", data.phoneNumber)
          app.wxRequest("gongguan/api/wechat/login",
            { phone: data.phoneNumber, verificationCode: "111111" },
            "post", function (res) {
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
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  getPhone: function (e) {
    console.log(e)
    this.setData({
      userPhone: e.detail.value
    })
  }
})