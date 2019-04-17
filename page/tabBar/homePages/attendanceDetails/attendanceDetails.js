var app = getApp();
Page({
  data: {
    selectStatus: 0,
    tabData:[],//表格数据
    peojectLIst:[],
    groupId: "",
  },
  onLoad: function (options) {
    // this.setData({
    //   groupId: options.groupId
    // })
  },
  onShow: function () {
    var that = this;
    var groupId = "4001201904100002001"
   
    // 项目汇总
    app.wxRequest("gongguan/api/wechat/myAttendanceMonthRecord",
      { groupId: groupId},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          var data = {
            "total": "1",
            "t": [
              {
                "month": "2019-04",
                "normalNum": "10天",
                "errorNum": "2天",
                "id": "4034201904010004002",
                "daysNum": "2天",
                "nightNum": "2天"
            }
            ]
          }


          // var data = res.data.data;
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  listTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject?id=' + id,
    })
  }

})