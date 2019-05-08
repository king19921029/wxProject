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
    var that = this
    // tab数据
    app.wxRequest("gongguan/api/wechat/myQuantityDetail",
      { groupId: that.data.groupId},
      "post", function (res) {
        var data = res.data.data
        console.log("tab数据：",res.data.data);
        if (res.data.code == 0) {
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细
    app.wxRequest("gongguan/api/wechat/myQuantityDetailTotal",
      { groupId: that.data.groupId },
      "post", function (res) {
        console.log("明细", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
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
  // 工作量详情
  // goWageDetails: function (e) {
  //   let id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: '/page/tabBar/homePages/seeWorkConfirm/seeWorkConfirm?id=' + id + "&groupId="+this.data.groupId
  //   })
  // },

})