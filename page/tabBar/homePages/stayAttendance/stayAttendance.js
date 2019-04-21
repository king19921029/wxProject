var app = getApp();
Page({
  data: {
    headerBorder: true,//header添加border
    blockIsShow: true,//浮层
    vipData:{},//班组考勤
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    var that = this;
    //班组考勤待办projectId、page
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirm",
      { projectId: "", page:""},
      "post", function (res) {
      console.log("班组考勤：",res.data.data);
      if (res.data.code == 0) {
        // var data = res.data.data;
        var data = {
          "total": "1",
          "t": [
            {
              "groupName": "大班组A",
              "month": "2019-04",
              "labourCompanyId": "4045201903280003005",
              "groupId": "4001201904140000001",
              "labourCompanyName": "小程序劳务公司",
              "classNum": "10",
              "projectName": "小程序项目",
              "projectId": "4034201904010004001"
            }
          ]
        }
       
        that.setData({
          vipData:data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 待办数量 groupAttendanceWaitConfirmCount
    app.wxRequest("gongguan/api/wechat/groupAttendanceWaitConfirmCount",
      { },
      "post", function (res) {
        console.log("班组待办数量：",res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            num: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 个人考勤待办
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirm",
      { page: "" },
      "post", function (res) {
        console.log("个人考勤：",res.data.data);
        if (res.data.code == 0) {
          // var data = res.data.data;
          var data = [
            {
              "groupName": "大班组A",
              "labourCompanyId": "4045201904100010002",
              "normalNum": "10天",
              "groupId": "4001201904140000001",
              "labourCompanyName": "小程序劳务公司",
              "errorNum": "2天",
              "id": "4034201904010004002",
              "classNum": "10天", 
              "projectName": "小程序项目",
              "nightNum": "2天", 
              "daysNum": "2天", 
              "projectId": "4034201904100007010"
            }
          ]

          that.setData({
            mineData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // header切换
  myWage: function () {
    this.setData({
      headerBorder: true
    })
  },
  youWage: function () {
    this.setData({
      headerBorder: false
    })
  },
  // 确定事件
  confirmationTap: function () {
    this.setData({
      blockIsShow: false
    })
  },
  // 取消
  no_tap: function () {
    this.setData({
      blockIsShow: true
    })
  },
  // 个人详情
  perDetails: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayAttendanceProject/stayAttendanceProject?id=' + id,
    })
  },
  //查看详情
  classDetails: function (e) {
    let month = e.currentTarget.dataset.month;
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipAttendanceDetails/stayVipAttendanceDetails?month=${month}&groupId=${groupId}`
    })
  },
})