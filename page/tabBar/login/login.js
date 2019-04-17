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
    // wx.login({
    //   success(res) {
    //     console.log(res);

    //     wx.openSetting({
    //       success(res) {
    //         console.log(res.authSetting)
    //         // res.authSetting = {
    //         //   "scope.userInfo": true,
    //         //   "scope.userLocation": true
    //         // }
    //       }
    //     })
    //     // if (res.code) {
    //     //   app.wxRequest("gongguan/api/wechat/getOpenIdByCode",
    //     //     { code: res.code },
    //     //     "post", function (res) {
    //     //       console.log(res)
    //     //       if (res.data.code == 0) {
    //     //         // app.wxRequest("gongguan/api/wechat/login",
    //     //         //   { code: res.code },
    //     //         //   "post", function (res) {
    //     //         //     console.log(res)
    //     //         //     if (res.data.code == 0) {

    //     //         //     } else {
    //     //         //       app.showLoading(res.data.msg, "none");
    //     //         //     }
    //     //         // })
    //     //       } else {
    //     //         app.showLoading(res.data.msg, "none");
    //     //       }
    //     //   })
    //     // } else {
    //     //   console.log('登录失败！' + res.errMsg)
    //     // }
    //   }
    // })


    console.log(e.detail)
   
  },
  getPhoneNumber: function (e) {
    console.log(e);
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  } 
})