var app = getApp();
Page({
  data: {
    btnFont: "确定",
    details:{},//数据
    time: "获取验证码",
    countTime: 60,
    disabled: false,
  },
  onLoad: function (options) {

    var month = options.month.replace(/年/, "-").replace(/月/, "")
    this.setData({
      groupId: options.groupId,
      month: month,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    // 工作量明细
    app.wxRequest("gongguan/api/wechat/waitConfirmQuantityDetail",
      { groupId: that.data.groupId, month: that.data.month},
      "post", function (res) {
      console.log("明细", res.data.data);
      if (res.data.code == 0) {
        var data = res.data.data;
        wx.setNavigationBarTitle({
          title: that.data.month
        })
        that.setData({
          details: data[0]
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  onHide: function () {
  },
  // 确定
  confirmBtn: function (e) {
    var that = this;
    // 确认id、verificationCode
    if (that.data.codeVal){
      app.wxRequest("gongguan/api/wechat/confirmQuantityStatus",
        { 
          ids: that.data.details.id, 
          verificationCode: that.data.codeVal
        },
        "post", function (res) {
          if (res.data.code == 0) {
            if (res.data.data) {
              wx.navigateBack()
            }
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      app.showLoading("请输入验证码", "none");
    }
  },
  // 获取验证吗
  getCode: function () {
    var that = this;
    let disabled = that.data.disabled;
    that.setData({
      disabled: true
    })
    // 验证码倒计时
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
      { tel: that.data.userPhone, type: 6},
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
  }
})