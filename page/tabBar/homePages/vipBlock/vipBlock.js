var app = getApp();
Page({
  data: {
    titleStatus:0,//title状态
    selectBox:false,
    attendanceData:[],//考勤数据
    workData:{},//工作量
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 班组考勤
    // app.wxRequest("gongguan/api/wechat/myGroupAttendance",
    //   {},
    //   "post", function (res) {
    //     console.log(res.data.data.t[0])
    //     if (res.data.code == 0) {
    //       that.setData({
    //         attendanceData: res.data.data
    //       })
    //     } else {
    //       app.showLoading(res.data.msg, "none");
    //     }
    // })

    // 班组查看工作量（projectId）
    app.wxRequest("gongguan/api/wechat/groupQuantity",
      { projectId:""},
      "post", function (res) {
        var data =  {
          "total": "1",
          "t": [
            {
              "groupName": "大班组A",
              "quantity": "122.0",
              "labourCompanyId": "4045201903280003005",
              "labourCompanyName": "小程序",
              "groupId": "1",
              "projectName": "小程序",
              "projectId": "4034201904010004001",
              "status": "4"
            }
          ]
        }
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            workData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
 
  //工资查看详情
  wageDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeWageDetails/vipSeeWageDetails',
    })
  },
  // 考勤查看详情
  attendanceDtails:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeAttendanceDetails/vipSeeAttendanceDetails',
    })
  },
  // 筛选
  screenTap:function(){
    this.setData({
      selectBox: !this.data.selectBox
    })
  },
  // 项目
  peojectTap: function () {
    this.setData({
      titleStatus: 0,
      selectBox:false
    })
  },
  // 考勤
  attendanceTap: function () {
    this.setData({
      titleStatus: 1,
      selectBox: false
    })
  },
  // 工作量
  workTap: function () {
    this.setData({
      titleStatus: 2,
      selectBox: false
    })
  },
  // 去工作量详情
  goWork:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeWorkDetails/vipSeeWorkDetails',
    })
  }

})