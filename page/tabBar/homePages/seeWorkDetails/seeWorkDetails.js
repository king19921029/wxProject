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
        var data = [
          {
            "workTypeName": "混林土工", 
            "subPro": "框架浇筑", 
            "id": "4006201903280003002",
            "startDate": "2019-04",
            "status": "未确认",
            "classNum":"1220"
          }
        ]
        // var data = res.data.data
        console.log("tab数据：",res.data.data);
        if (res.data.code == 0) {
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 
    app.wxRequest("gongguan/api/wechat/groupQuantityDetailTotal",
      { groupId: that.data.groupId },
      "post", function (res) {
        var data = [
          {
            "workTypeName": "混林土工",
            "subPro": "框架浇筑",
            "id": "4006201903280003002",
            "startDate": "2019-04",
            "status": "未确认",
            "classNum": "1220"
          }
        ]
        // var data = res.data.data
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  // 工资详情
  goWageDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=' + this.data.groupId,
    })
  },

})