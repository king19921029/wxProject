var app = getApp();
Page({

  data: {
    
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    // app.wxRequest("gongguan/api/wechat/myProject",
    //   {},
    //   "post", function (res) {
    //     console.log(res)
    //     if (res.data.code == 0) {
          
    //     } else {
    //       app.showLoading(res.data.msg, "none");
    //     }
    // })
  },
  onHide: function () {
    
  },
  // 待办-消息
  goNews:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/news/news',
    })
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
    let sum = Math.random();
    if( sum > 0.5 ){
      app.showLoading("我是普通员工","none")
      setTimeout(function () {
        wx.navigateTo({
          url: '/page/tabBar/homePages/seeWage/seeWage',
        })
      }, 500)
     
    }else{
      app.showLoading("我是班组","none")
      setTimeout(function(){
        wx.navigateTo({
          url: '/page/tabBar/homePages/vipSeeWage/vipSeeWage',
        })
      },500)
     
    }
   
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