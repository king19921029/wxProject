var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 表格数据
    app.wxRequest("gongguan/api/wechat/mySalaryDetail",
      { groupId: that.data.groupId, page: 1},
      "post", function (res) {
      console.log("tab数据：",res.data.data);
      var data = res.data.data;
      if (res.data.code == 0) {
        that.setData({
          tabData: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/mySalaryWaitConfirmDetailTotal",
      { groupId: that.data.groupId },
      "post", function (res) {
        console.log("明细汇总", res.data.data)

        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
          wx.setNavigationBarTitle({
            title: data.name + data.date
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  // 工资详情
  goWageDetails: function (e) {
  let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails?id=' +id,
    })
  },

})