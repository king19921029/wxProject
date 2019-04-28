var app = getApp();
Page({
  data: {
    btnFont:"确定",
    time: "获取验证码",
    countTime: 60,
    disabled: false,
  },
  onLoad: function (options) {
    this.setData({
      id:options.id,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/groupSalaryDetailMonth",
      { id: that.data.id},
      "post", function (res) {
      console.log("工资确认", res.data.data)
     
      if (res.data.code == 0) {
        var data = res.data.data;
        that.setData({
          details: data
        })
        wx.setNavigationBarTitle({
          title: data.month+"工资明细"
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  onHide: function () {

  },
  confirmBtn: function () {
    var that = this;
    if (that.data.codeVal ){
      //个人工资确认
      app.wxRequest("gongguan/api/wechat/confirmSalary",
        {
          id: that.data.id,
          verificationCode: that.data.codeVal
        },
        "post", function (res) {
          console.log("提交工资：", res.data.data)
          if (res.data.code == 0) {
            if (res.data.data) {
              wx.navigateBack({
                delta: 2,
              })
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
      { tel: that.data.userPhone,type:5 },
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