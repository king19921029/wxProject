var app = getApp();
Page({
  data: {
    selectStatus: 0,
    userName:"",//打卡人
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userName: options.userName,
      day:options.day,
    })
  },
  onShow: function () {
    var that = this;
    // 打卡
    app.wxRequest("gongguan/api/wechat/clockDetail",
      { day: this.data.day },
      "post", function (res) {
        console.log("打卡", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            titleData: data
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