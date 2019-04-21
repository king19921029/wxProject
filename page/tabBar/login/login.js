var app = getApp();
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
  getCode:function(e){
    wx.login({
      success(res) {
        console.log(res);

        wx.openSetting({
          success(res) {
            console.log(res.authSetting)
            res.authSetting = {
              "scope.userInfo": true,
              "scope.userLocation": true
            }
          }
        })
        if (res.code) {
          app.wxRequest("gongguan/api/wechat/getOpenIdByCode",
            { code: res.code },
            "post", function (res) {
              console.log("openid:",res)
              app.globalData.header.openId = res.data.data;
              console.log(app.globalData.header)
              if (res.data.code == 0) {
                app.wxRequest("gongguan/api/wechat/login",
                  { phone: "15210406270", verificationCode:"111111" },
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
              } else {
                app.showLoading(res.data.msg, "none");
              }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


    console.log(e.detail)
   
  },
  getPhoneNumber: function (e) {
    console.log(e);
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  } 
})