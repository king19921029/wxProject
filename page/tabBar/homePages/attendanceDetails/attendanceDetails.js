var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:[],//表格数据
    peojectLIst:[],
    groupId: "4001201904100002001",
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    var that = this;
    var groupId = that.data.groupId;
    // 我的项目考勤列表(projectId,labourCompany,groupId,page)
    app.wxRequest("gongguan/api/wechat/myAttendanceRecord",
      {},
      "post", function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            peojectLIst: res.data.data
          })
          wx.setNavigationBarTitle({
            title: res.data.data.t[0].projectName + "考勤汇总"
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 项目汇总
    app.wxRequest("gongguan/api/wechat/myAttendanceMonthRecord",
      { groupId: groupId},
      "post", function (res) {
        console.log(res.data.data.t[0])
        if (res.data.code == 0) {
          that.setData({
            tabData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  listTap: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject',
    })
  }

})