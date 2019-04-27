var app = getApp();
Page({
  data: {
    headerBorder: true,//header添加border
    vipData:{},//班组考勤
    id:"",//id
  },
  onLoad: function (options) {
    this.setData({
      userPhone: app.globalData.userPhone
    })
  },
  onReady: function () {

  },
  onShow: function () {
    var that = this;
    // 待办数量 groupAttendanceWaitConfirmCount
    app.wxRequest("gongguan/api/wechat/groupAttendanceWaitConfirmCount",
      { },
      "post", function (res) {
        console.log("班组待办数量：",res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          if (data.isLeader){
            that.perData(1);
            that.vipData("",1);
          }else{
            that.perData(1);
          }
          that.setData({
            num: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 个人考勤
  perData:function(page){
    var that = this;
    // 个人考勤待办
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirm",
      { page:page },
      "post", function (res) {
        console.log("个人考勤：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            mineData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 班组考勤
  vipData: function (projectId, page){
    var that = this;
    //班组考勤待办projectId、page
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirm",
      { projectId: projectId, page:page },
      "post", function (res) {
        console.log("班组考勤：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;

          that.setData({
            vipData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 我的
  myWage: function () {
    this.setData({
      headerBorder: true
    })
  },
  // 班组的
  youWage: function () {
    this.setData({
      headerBorder: false
    })
  },
  // 确定事件
  confirmationTap: function (e) {

    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayAttendanceProject/stayAttendanceProject?id=' + id,
    })
  },
  //班组查看详情
  classDetails: function (e) {
    let month = e.currentTarget.dataset.month;
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipAttendanceDetails/stayVipAttendanceDetails?month=${month}&groupId=${groupId}`
    })
  },

})