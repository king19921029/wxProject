var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {

    this.setData({
      id: options.id,
    })
    wx.setNavigationBarTitle({
      title: "个人考勤明细"
    })
  },
  onShow: function () {
    var that = this;
    //个人考勤明细tab
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirmDetail",
      { id: that.data.id},
      "post", function (res) {
        console.log("表格：", res.data.data)
        if (res.data.code == 0) {
          // var data = res.data.data;
          var data = {
            "total": "1",
            "t": [
              {
                "attendanceType": "白班",
                "remark": "备注",
                "id": "4034201904010004001",
                "classNum": "1",
                "clockTime": "04-01"
              }
            ]
          }
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 个人考勤待办
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirm",
      { page: "" },
      "post", function (res) {
        console.log("个人考勤：", res.data.data);
        if (res.data.code == 0) {
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
          var arr = [];
          // var data = res.data.data;
          for( var i = 0;i<data.length;i++ ){
            if (data[i].id == that.data.id ){
              arr.push(data[i])
            }
          }
        
          that.setData({
            mineData: arr
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // 确认
  confirmBtn: function () {
    var that = this;
    // 我的工资确认groupId、Ids多选 英文逗号分开
    app.wxRequest("gongguan/api/wechat/groupConfirmPersonAttendance",
      { groupId: that.data.groupId, Ids: "" },
      "post", function (res) {
        console.log("确定：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            // myWage: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },

})