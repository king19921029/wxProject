Page({

  data: {
    
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  //待办
  goWage:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageConfirmation/WageConfirmation',
    })
  },
  // 查看-工资
  goWageBlock: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageBlock/wageBlock',
    })
  },
  goAttendance:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendance/attendance',
    })
  }
})