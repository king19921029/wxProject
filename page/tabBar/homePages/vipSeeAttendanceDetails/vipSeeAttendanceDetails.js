var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",
    tabData:{},//表格数据
    monthData:{},//月份数据
    personData:{},//人员数据
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    var groupId = that.data.groupId;
    // 表格数据groupId、month、page、personId
    app.wxRequest("gongguan/api/wechat/queryGroupPersonMonthAttendance",
      { groupId: groupId, month: "", page: "",personId:""},
      "post", function (res) {
        console.log("表格数据：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            tabData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 月份
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceMonth",
      { groupId: groupId },
      "post", function (res) {
        console.log("月份：",res.data)
        if (res.data.code == 0) {
          that.setData({
            monthData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 所有人员
    app.wxRequest("gongguan/api/wechat/queryGroupPerson",
      { groupId: groupId  },
      "post", function (res) {
        console.log("班组人员：",res.data.data)
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
      url: '/page/tabBar/homePages/vipSeeAttendanceProject/vipSeeAttendanceProject?groupId=' + this.data.groupId,
    })
  },

})