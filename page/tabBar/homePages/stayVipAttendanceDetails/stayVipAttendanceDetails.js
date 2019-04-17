var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",//班组id
    month:"",//月份
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      month: options.month
    })
    wx.setNavigationBarTitle({
      title: "某班组考勤汇总"
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId;
    let month = that.data.month;
    //表格 groupId、month、page
    app.wxRequest("gongguan/api/wechat/queryGroupAttendaceDetail",
      { groupId: "4001201904140000001", page: '', month: month,  },
      "post", function (res) {
      console.log(res.data.data)
      if (res.data.code == 0) {
        // var data = res.data.data;
        var data = {
          "total": "1",
          "t": [
            {
              "nigthNum": "2", 
              "month": "2019-04", 
              "classNum": "10", 
              "userName": "小程序用户", 
              "daysNum": "2",
              "userId": "2070201904010001002",
              "status":4
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
    // 表格上面的数据
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirmDetailTotle",
      { groupId:that.data.groupId},
      "post", function (res) {
        console.log("表格上面的数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  //查看详情
  goDetails: function (e) {
    var that = this;
    let types = e.currentTarget.dataset.types;
    if( types == 0 ){
      return false;
    }
    let userId = e.currentTarget.dataset.userid;
    let month = that.data.month;
    let groupId = that.data.groupId;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipAttendanceProject/stayVipAttendanceProject?month=${month}&groupId=${groupId}&userId=${userId}&titles=班组考勤明细`
    })
  },
  

})