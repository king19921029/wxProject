var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:[],//表格数据
    peojectLIst:[],
    groupId: "",
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;   
    // tab数据
    app.wxRequest("gongguan/api/wechat/myAttendanceMonthRecord",
      { groupId: that.data.groupId,page:1},
      "post", function (res) {
        console.log("tab数据:",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细汇总    myAttendanceDetailTotal
    app.wxRequest("gongguan/api/wechat/myAttendanceDetailTotal",
      { groupId: that.data.groupId },
      "post", function (res) {
        console.log("明细汇总:", res.data.data)
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
  listTap: function (e) {
    let id = e.currentTarget.id;
    let month = e.currentTarget.dataset.month;

    console.log(id)
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject?groupId=' + this.data.groupId + "&id=" + id + "&month=" + month,
    })
  }

})