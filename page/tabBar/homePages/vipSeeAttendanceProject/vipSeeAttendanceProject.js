var app = getApp();
Page({
  data: {
    selectStatus: 0,
    allData:{},//所有数据
    groupId: "",
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "某班组考勤"
    })
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    var groupId = that.data.groupId;
    //tab数据
    app.wxRequest("gongguan/api/wechat/queryGroupPersonDetail",
      { groupId: groupId, month: "", page: "", personId:""},
      "post", function (res) {
      console.log("tab数据：",res.data.data)
      // var data = res.data.data;
      var data = {
        "total": "1",
        "t": [
          {
            "noon2": "00:00",
            "noon1": "00:00",
            "night": "00:00",
            "classNum": "1", 
            "clockStatus": "正常",
            "id": "4034201904010004001",
            "clockTime": "04-01",
            "morning": "00:00"
          }
        ]
      }
      if (res.data.code == 0) {
        that.setData({
          tabData: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceDetailTotal",
      { groupId: groupId },
      "post", function (res) {
        console.log("明细汇总：",res.data.data)
        var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            allData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 查看打卡详情
  goCard: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipAttendanceCard/vipAttendanceCard',
    })
  }

})