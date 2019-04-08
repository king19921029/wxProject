
Page({
  data: {
    selectStatus: 0,
    userName:"",//打卡人
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userName: options.userName
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
  listTap: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject',
    })
  }

})