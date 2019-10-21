var app = getApp();
Page({
  data: {
    time: "获取验证码",
    countTime: 60,
    disabled: false,
   
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var tel = app.globalData.userPhone;
    tel = "" + tel;
    var userPhone = tel.replace(tel.substring(3, 7), "****")
    this.setData({
      userPhone: userPhone,
      tel: tel
    })
  },
  onHide: function () {

  },
  // 获取验证吗
  getCode: function () {
    var that = this;
    // 验证码倒计时
    that.setData({
      disabled: true
    })
    var countTime = that.data.countTime
    var interval = setInterval(function () {
      countTime--
      that.setData({
        time: countTime + 's'
      })
      if (countTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          countTime: 60,
          disabled: false
        })
      }
    }, 1000)
    app.wxRequest("gongguan/api/wechat/sendCode",
      { tel: that.data.tel,type:8},
      "post", function (res) {
      console.log("验证码：", res.data.data);
      if (res.data.code == 0) {
        var data = res.data.data;
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })

  },
  // 获取输入的code
  get_val: function (e) {
    this.setData({
      codeVal: e.detail.value
    })
  },
  next:function(){
    var that = this;
    if (that.data.codeVal ){
      app.wxRequest("gongguan/api/wechat/checkPhoneCodeResetPassword",
        { verificationCode: that.data.codeVal },
        "post", function (res) {
          console.log("验证码：", res.data.data);
          if (res.data.code == 0) {
            var data = res.data.data;
            if (data) {
              wx.navigateTo({
                url: '/page/tabBar/minePages/setPassword/setPassword?type=' + 2 + "&code=" + that.data.codeVal,
              })
            }
          } else {
            app.showLoading(res.data.msg, "none");
          }
        })
    }else{
      app.showLoading("请输入验证码",'none')
    }
    
  }
})