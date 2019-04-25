var app = getApp();
Page({
  data: {
    btnFont: "确定",
    details:{},//数据
  },
  onLoad: function (options) {
    var month = options.month.replace(/年/, "-").replace(/月/, "")
    this.setData({
      groupId: options.groupId,
      month: month
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
    app.wxRequest("gongguan/api/wechat/confirmQuantityStatus",
      { ids: that.data.details.id, verificationCode: "111111" },
      "post", function (res) {
        console.log("提交工资：", res.data.data)
        if (res.data.code == 0) {
          if (res.data.data) {
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
})