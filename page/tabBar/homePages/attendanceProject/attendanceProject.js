var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:{},//tab数据
    titleData:{},//title数据
    groupId: "4001201904100002001",
  },
  onLoad: function (options) {
   
  },
  onShow: function () {
    var that = this;
    var groupId = that.data.groupId;
    // 项目汇总
    app.wxRequest("gongguan/api/wechat/myAttendanceMonthRecord",
      { groupId: groupId },
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            titleData: res.data.data.t[0]
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    // 某项目考勤明细
    app.wxRequest("gongguan/api/wechat/myAttendanceDetail",
      { id:"4034201904010004002"},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            tabData: res.data.data
          })
          wx.setNavigationBarTitle({
            title: res.data.data.userName
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // 查看-班组
  goCard: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceCard/attendanceCard?userName=' + this.data.tabData.userName,
    })
  }

})