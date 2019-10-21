var app = getApp();
Page({
  data: {
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      oldPhone: app.globalData.userPhone
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 下一步
  next:function(){
    var that = this;
    let verificationCode = that.data.codeVal;
    if (verificationCode){
      app.wxRequest("gongguan/api/wechat/checkPhoneCode",
        { 
          phone: that.data.oldPhone,
          type: 7,
          verificationCode: verificationCode
        },
        "post", function (res) {
          console.log("验证码：", res.data.data);
          if (res.data.code == 0) {
            if(res.data.data){
              wx.navigateTo({
                url: '/page/tabBar/minePages/newPhone/newPhone?oldPhone=' + that.data.oldPhone + "&oldVerificationCode=" + verificationCode
              })
            }

          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }
   
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
    app.wxRequest("gongguan/front/sendCode",
      { tel: that.data.oldPhone, type: 7 },
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

})