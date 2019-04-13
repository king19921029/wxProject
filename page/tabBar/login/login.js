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
        if (res.code) {
          app.wxRequest("gongguan/api/wechat/getOpenIdByCode",
            { code: res.code },
            "post", function (res) {
              console.log(res)

              if (res.data.code == 0) {

              } else {
                app.showLoading(res.data.msg, "none");
              }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

   
  } 
})