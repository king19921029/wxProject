var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:{},//tab数据
    titleData:{},//title数据
    groupId: "4001201904100002001",
  },
  onLoad: function (options) {
   this.setData({
    id: options.id
   })
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
          var data = {
            "total": "1",
            "t": [
              {
                "month": "2019-04",
                "normalNum": "10天",
                "errorNum": "2天",
                "id": "4034201904010004002",
                "daysNum": "2天",
                "nightNum": "2天"
            }
            ]
          }

          that.setData({
            titleData: data.t[0]
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // tab数据
    app.wxRequest("gongguan/api/wechat/myAttendanceDetail",
      { id:"4034201904010004002"},
      "post", function (res) {
        console.log("tab数据：",res)
        if (res.data.code == 0) {

          var data = {
            "page": {
              "total": "1",
              "t": [
                {
                  "noon2": "00:00",
                  "noon1": "00:00",
                  "night": "00:00",
                  "clockStatus": "正常",
                  "id": "4034201904010004001",
                  "clockTime": "04-01",
                  "morning": "00:00"
                }
              ]
            },
            "userName": "小程序测试用户"
          }

          that.setData({
            tabData: data.page
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
  // 查看-班组
  goCard: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceCard/attendanceCard?userName=' + this.data.tabData.userName,
    })
  }

})