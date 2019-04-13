var app = getApp();
Page({
  data: {
    selectStatus: 0,
    allData:{},//所有数据
    groupId: "4001201904100002001",
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态设置的标题"
    })
  },
  onShow: function () {
    var that = this;
    // 班组考勤
    var groupId = that.data.groupId;
    app.wxRequest("gongguan/api/wechat/queryGroupPersonDetail",
      { groupId: groupId, month: "", page: "", personId:""},
      "post", function (res) {
        console.log(res.data.data)
        // var data = res.data.data;
        var data = {
              "total": "1",
              "t": [
                {
                  "noon2": "00:00", 
                  "noon1": "00:00",
                  "night": "00:00", 
                  "CLASS_NUM": "1", 
                  "clockStatus": "正常", 
                  "id": "4034201904010004001",
                  "clockTime": "04-01", 
                  "morning": "00:00" 
                }
            ]
        }

        if (res.data.code == 0) {
          that.setData({
            allData: data
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