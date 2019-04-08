var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:{},//表格数据
    monthData:{},//月份数据
    personData:{},//人员数据
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 表格数据
    app.wxRequest("gongguan/api/wechat/myGroupAttendanceToPerson",
      { groupPersonId: "", attendanceId: "4034201904010004002", month: "", page:""},
      "post", function (res) {
        console.log(res.data.data.t[0])
        if (res.data.code == 0) {
          that.setData({
            tabData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 月份
    app.wxRequest("gongguan/api/wechat/myGroupAttendanceMonth",
      { groupId: "1" },
      "post", function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            monthData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 所有人员
    app.wxRequest("gongguan/api/wechat/myGroupAttendancePerson",
      { groupId: "1" },
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            personData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
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