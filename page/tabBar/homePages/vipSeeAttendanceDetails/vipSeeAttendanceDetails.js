
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  //月份
  peojectTap: function () {
    var that = this;
    if (that.data.selectStatus == 1 ){
      this.setData({
        selectStatus: 0
      })
    }else{
      this.setData({
        selectStatus: 1
      })
    }
    
  },
  // 班组人员选择
  companyTap: function () {
    var that = this;
    if (that.data.selectStatus == 2) {
      this.setData({
        selectStatus: 0
      })
    } else {
      this.setData({
        selectStatus: 2
      })
    }
  },
  //查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeAttendanceProject/vipSeeAttendanceProject',
    })
  },

})