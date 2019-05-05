var app = getApp();
import PageList from "../../../util/util.js";
Page({

  data: {
    blockIsShow: false,
  },
  onLoad: function (options) {
    // PageList.getDate().then((res)=>{
    //   console.log(res)
    // });
  },
  onReady: function () {
    
  },
  onShow: function () {
    var that = this;
    var token = wx.getStorageSync("token");
    that.setData({
      token:token
    })
    if (token){
      app.wxRequest("gongguan/api/wechat/index",
        {},
        "post", function (res) {
          console.log("首页数据：", res.data.data)
          if (res.data.code == 0) {
            that.setData({
              indexData: res.data.data
            })
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
      app.wxRequest("gongguan/api/wechat/myInfo",
        {},
        "post", function (res) {
        console.log("个人信息：",res.data.data)
        if (res.data.code == 0) {
          if (res.data.data.isAuth == "0") {
            that.setData({
              blockIsShow: true
            })
          }else{
            that.setData({
              blockIsShow: false
            })
          }

        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    }

  },
  onHide: function () {
    
  },
  //待办-消息
  goNews:function(){
    if(this.data.token){
      wx.navigateTo({
        url: '/page/tabBar/homePages/news/news',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
   
   
  },
  //待办-考勤
  goVipStayAttendance:function(){
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/stayAttendance/stayAttendance',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
   
  },
  //待办-工资
  goStayWage:function(){
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/stayWageConfirm/stayWageConfirm',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
  
  },
  //待办-工作量
  goStayWorkload: function () {
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/stayworkload/stayworkload',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
   
  },
  // 查看-考勤
  goAttendance:function(){
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/seeAttendance/seeAttendance',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
  },
  // 查看-工资
  goWageBlock: function () {
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/seeWage/seeWage',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
  }, 
  // 查看-工作量
  goWorkload: function () {
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/seeWorkload/seeWorkload',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
  
  },
  // 查看-班组
  goTeam: function () {
    if (this.data.token) {
      wx.navigateTo({
        url: '/page/tabBar/homePages/vipBlock/vipBlock',
      })
    }else{
      wx.navigateTo({
        url: '/page/tabBar/login/login',
      })
    }
  },
  //实名认证
  goAuthentication: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/authentication/authentication',
    })
  },
  // 稍后认证
  closeTap: function () {
    this.setData({
      blockIsShow: false
    })
  },
  onReachBottom: function () {
    console.log('加载更多')
    setTimeout(() => {
    }, 1000)
  },
})