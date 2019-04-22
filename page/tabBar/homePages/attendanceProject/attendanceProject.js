var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:{},//tab数据
    titleData:{},//title数据
    groupId: "",
  },
  onLoad: function (options) {
   this.setData({
     groupId: options.groupId,
     id:options.id
   })
  },
  onShow: function () {
    var that = this;
    var id = that.data.id;
    var groupId = that.data.groupId;
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/myAttendanceMonthRecord",
      { groupId: groupId },
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
        console.log("tab数据：",res)
        if (res.data.code == 0) {
          // var data = res.data.data
          var data = {
          
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
              ],
             "userName": "小程序测试用户"
          }
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
    let userId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceCard/attendanceCard?userName=' + this.data.tabData.userName + "&day=" + this.data.titleData.month+"&uersId="+userId,
    })
  }

})