var app = getApp();
Page({
  data: {
    btnFont: "提交劳务公司审核",
    details:{},//数据
  },
  onLoad: function (options) {
   
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 明细
    // app.wxRequest("gongguan/api/wechat/myQuantityWaitConfrimDetailTotal",
    //   { groupId: that.data.groupId},
    //   "post", function (res) {
    //   console.log("明细", res.data.data);
    //   if (res.data.code == 0) {
    //     var data = res.data.data;
    //     wx.setNavigationBarTitle({
    //       title:data.page.startDate
    //     })
    //     that.setData({
    //       details: data
    //     })
    //   } else {
    //     app.showLoading(res.data.msg, "none");
    //   }
    // })

    var data = {
      "groupCount": "1",
      "isLeader": true,
      "page": {
        "workTypeName": "混林土工", 
        "subPro": "框架浇筑", 
        "id": "4006201903280003002",
        "startDate": "2019-04",
        "status": "未确认",
        "quantity":"122.0"
      }

    }
    that.setData({
      details:data
    })
    wx.setNavigationBarTitle({
      title: data.page.startDate
    })

  },
  onHide: function () {

  },
})