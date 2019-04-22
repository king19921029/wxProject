  var app = getApp();
Page({
  data: {
    btnFont: "提交劳务公司审核"
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
    var that = this;
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/salaryDetailMonth",
      { id: that.data.id },
      "post", function (res) {
        console.log("工资确认", res.data.data)

        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
          wx.setNavigationBarTitle({
            title:data.month
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
    // 我的工资确认id、verificationCode
    app.wxRequest("gongguan/api/wechat/confirmSalary",
      { id: that.data.id, verificationCode: "012345" },
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
  },
})