var app = getApp();
Page({
  data: {
    selectStatus: 0,
    allData:{},//所有数据
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态设置的标题"
    })
  },
  onShow: function () {
    var that = this;
    // 班组考勤
    app.wxRequest("gongguan/api/wechat/myGroupAttendanceToPersonDetail",
      { groupId: "1", groupPersonId: "2070201904010001002", attendanceId:"4034201904010004002",page:""},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            allData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // 查看打卡详情
  goCard: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipAttendanceCard/vipAttendanceCard',
    })
  }

})