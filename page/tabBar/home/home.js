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
  //待办-工资
  goStayWage:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayWageConfirm/stayWageConfirm',
    })
  },
  //待办-工作量
  goStayWorkload: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkload/stayworkload',
    })
  },
  // 查看-考勤
  goAttendance:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/seeAttendance/seeAttendance',
    })
  },
  // 查看-工资
  goWageBlock: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/seeWage/seeWage',
    })
  }, 
   // 查看-工作量
  goWorkload: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/seeWorkload/seeWorkload',
    })
  },
  // 查看-班组
  goTeam: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/seeTeam/seeTeam',
    })
  }
})