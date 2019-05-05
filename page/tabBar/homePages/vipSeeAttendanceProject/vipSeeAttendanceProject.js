var app = getApp();
Page({
  data: {
    selectStatus: 0,
    allData:{},//所有数据
    groupId: "",
  },
  onLoad: function (options) {
   
    this.setData({
      groupId: options.groupId,
      personId: options.personId,
      month:options.month
    })
  },
  onShow: function () {
    var that = this;
    var groupId = that.data.groupId;
    var personId = that.data.personId;
    var month = that.data.month;
    //tab数据
    app.wxRequest("gongguan/api/wechat/queryGroupPersonDetail",
      { groupId: groupId, month: month, page: 1, personId: personId},
      "post", function (res) {
      console.log("tab数据：",res.data.data)
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
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceDetailTotal",
      { groupId: groupId, month: month, userId: personId },
      "post", function (res) {
        console.log("明细汇总：",res.data.data)
        var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            allData: data
          })
          wx.setNavigationBarTitle({
            title: data.groupName + "考勤"
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 查看打卡详情
  goCard: function (e) {
    let month = e.currentTarget.dataset.month;
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipAttendanceCard/vipAttendanceCard?userId=' + this.data.personId+"&month="+month,
    })
  }

})