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
      { groupId: that.data.groupId},
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
          // var data = {
          //   "total": "1",
          //   "t": [
          //     {
          //       "month": "2019-04",
          //       "normalNum": "10天",
          //       "errorNum": "2天",
          //       "id": "4034201904010004002",
          //       "daysNum": "2天",
          //       "nightNum": "2天"
          //     }
          //   ]
          // }

          var data = res.data.data;
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
  listTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject?id=' + id,
    })
  }

})