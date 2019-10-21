var app = getApp();
Page({
  data: {
    btnFont: "确定",
    details: {},//数据
    time: "获取验证码",
    countTime: 60,
    disabled: false,
  },
  onLoad: function (options) {

    this.setData({
      id: options.id,
      groupId: options.groupId,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    // 工作量明细
    app.wxRequest("gongguan/api/wechat/groupQuantityPersonDetail",
      { id: that.data.id },
      "post", function (res) {
        console.log("明细", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          wx.setNavigationBarTitle({
            title: data.month
          })
          that.setData({
            details: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  // 确定
  confirmTap: function () {
    var that = this;
    let id = that.data.id;
    let groupId = that.data.groupId;
    let month = that.data.details.month.replace('年', '-').replace('月', '');
    // 确定
    app.wxRequest("gongguan/api/wechat/groupQuantityConfirm",
      { groupId: groupId, ids: id, verificationCode: that.data.codeVal },
      "post", function (res) {
        console.log("全部确定", res.data.data)
        if (res.data.code == 0) {
          wx.navigateBack({
            delta: 2,
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
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
        { tel: that.data.userPhone },
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