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
    })
  
  },
  onShow: function () {
    var that = this;
    //tab数据groupId、month、userId
    app.wxRequest("gongguan/api/wechat/queryGroupAttendancePersonMonthDetail",
      { groupId: that.data.groupId, month: that.data.month, userId: that.data.userId },
      "post", function (res) {
      console.log("表格：",res.data.data)
      if (res.data.code == 0) {
        var data = res.data.data;
        that.setData({
          tabData: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/groupPersonMonthAttendanceDetail",
      { groupId: that.data.groupId, month: that.data.month, userId: that.data.userId},
      "post", function (res) {
      console.log("明细：", res.data.data)
      if (res.data.code == 0) {
        var data = res.data.data;
        that.setData({
          details: data[0]
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
    let id = that.data.details.id
    // 我的工资确认groupId、Ids多选 英文逗号分开
    app.wxRequest("gongguan/api/wechat/groupConfirmPersonAttendance",
      { groupId: that.data.groupId, Ids: id},
      "post", function (res) {
        console.log("确定：",res.data.data)
        if (res.data.code == 0) {
          if( res.dara.data ){
            wx.navigateBack()
          }
         
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },

})