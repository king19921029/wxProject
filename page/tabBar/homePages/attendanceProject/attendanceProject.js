var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:{},//tab数据
    titleData:{},//title数据
    groupId: "",
    month:"",
  },
  onLoad: function (options) {

   this.setData({
     groupId: options.groupId,
     id:options.id,
     month: options.month
   })
  },
  onShow: function () {
    var that = this;
    var id = that.data.id;
    var groupId = that.data.groupId;
    var month = that.data.month;
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/myAttendanceMonthRecord",
      { groupId: groupId, month: month },
      "post", function (res) {
        console.log("明细汇总：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            titleData: data.t[0]
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // tab数据
    app.wxRequest("gongguan/api/wechat/myAttendanceDetail",
      { id: id,page:1},
      "post", function (res) {
        console.log("tab数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data
          that.setData({
            tabData: data
          })
          wx.setNavigationBarTitle({
            title:data.userName
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // 打卡详情
  goCard: function (e) {
    let month = e.currentTarget.dataset.month;
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceCard/attendanceCard?userName=' + this.data.tabData.userName + "&day=" + month
    })
  }

})