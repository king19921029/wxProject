var app = getApp();
Page({
  data: {
    btnFont: "提交劳务公司审核",
    details: {},//数据
  },
  onLoad: function (options) {

    this.setData({
      id: options.id,
      groupId: options.groupId
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
      { groupId: groupId, month: month, ids: id, verificationCode: "111111" },
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
})