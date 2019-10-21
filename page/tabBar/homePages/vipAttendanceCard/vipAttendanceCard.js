var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
   this.setData({
     month: options.month,
     userId: options.userId
   })
  },
  onShow: function () {
    var that = this;
    //tab数据
    let month = that.data.month;
    let userId = that.data.userId;
    app.wxRequest("gongguan/api/wechat/groupClockDetail",
      {day: month,userId: userId },
      "post", function (res) {
        console.log("打卡数据：", res.data.data)
        var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            tabData: data
          })
          wx.setNavigationBarTitle({
            title: data.clockDate
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
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(e.currentTarget.dataset.srcimg)
    var arr = [];
    arr.push(e.currentTarget.dataset.srcimg)
    wx.previewImage({
      current: e.currentTarget.dataset.srcimg, // 当前显示图片的http链接  
      urls: arr // 需要预览的图片http链接列表  
    })
  },

})