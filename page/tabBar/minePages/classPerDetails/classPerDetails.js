var app = getApp()
Page({
  data: {
    blockIsShow: false,
    details: {},
    userId:"",
  },
  onLoad: function (options) {
    this.setData({
      userId: options.userId,
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 人员详情
    app.wxRequest("gongguan/api/wechat/groupPersonInfo",
      { groupId: that.data.groupId, userId: that.data.userId },
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
          wx.setNavigationBarTitle({
            title: data.leaderName
          })

        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },

})