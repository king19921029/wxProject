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
      oldPhone: options.oldPhone,
      oldVerificationCode: options.oldVerificationCode
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 确认
  next: function () {
    var that = this;
    let oldVerificationCode = that.data.oldVerificationCode;
    let oldPhone = that.data.oldPhone;
    let newPhone = that.data.newPhone;
    let newVerificationCode = that.data.newVerificationCode;
    if (newVerificationCode && newPhone){
      app.wxRequest("gongguan/api/wechat/updatePhone",
        {
          newPhone: newPhone,
          newVerificationCode: newVerificationCode,
          oldPhone: oldPhone,
          oldVerificationCode: oldVerificationCode
        },
        "post", function (res) {
          console.log("验证码：", res.data.data);
          if (res.data.code == 0) {
            if (res.data.data) {

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
    app.wxRequest("gongguan/front/isSendSmsCode.action",
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
  //获取新手机号
  get_phone_val: function (e) {
    this.setData({
      newPhone: e.detail.value
    })
  },
  get_code_val:function(e){
    this.setData({
      newVerificationCode: e.detail.value
    })
  },

})