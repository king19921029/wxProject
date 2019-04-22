var app = getApp();
Page({
  data: {
    btnFont: "提交劳务公司审核",
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
})