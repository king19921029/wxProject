var app = getApp();
Page({
  data: {
    btnFont: "提交劳务公司审核",
    details: {},//数据
  },
  onLoad: function (options) {

    this.setData({
      id: options.id,
    })
  },
  onShow: function () {
    var that = this;
    // 工作量明细
    app.wxRequest("gongguan/api/wechat/quantityDetailList",
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
})