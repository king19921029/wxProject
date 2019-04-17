var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
   
    this.setData({
      userId:options.userId,
      groupId: options.groupId,
      month: options.month,
      titles: options.titles
    })
    wx.setNavigationBarTitle({
      title: options.titles
    })
  },
  onShow: function () {
    var that = this;
    //某人某月考勤明细groupId、month、userId
    app.wxRequest("gongguan/api/wechat/queryGroupAttendaceDetail",
      { groupId: that.data.groupId, month: that.data.month,userId: that.data.userId},
      "post", function (res) {
      console.log("表格：",res.data.data)
      if (res.data.code == 0) {
        // var data = res.data.data;
        var data = {
          "total": "1",
          "t": [
            {
              "attendanceType": "白班",
              "remark": "备注",
              "id": "4034201904010004001",
              "classNum": "1",
              "clockTime": "04-01"
            }
          ]
        }
        that.setData({
          details: res.data.data,
          tabData: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirmDetailTotle",
      { groupId: that.data.groupId},
      "post", function (res) {
      console.log("明细：", res.data.data)
      if (res.data.code == 0) {
        // var data = res.data.data;
        var data = {
          "total": "1",
          "t": [
            {
              "attendanceType": "白班",
              "remark": "备注",
              "id": "4034201904010004001",
              "classNum": "1",
              "clockTime": "04-01"
            }
          ]
        }
        that.setData({
          details: res.data.data,
          tabData: data
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
      url: '/page/tabBar/homePages/attendanceCard/attendanceCard',
    })
  },
  // 确认
  confirmBtn: function () {
    var that = this;
    // 我的工资确认groupId、Ids多选 英文逗号分开
    app.wxRequest("gongguan/api/wechat/groupConfirmPersonAttendance",
      { groupId: that.data.groupId,Ids:""},
      "post", function (res) {
        console.log("确定：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            // myWage: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },

})