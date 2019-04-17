var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/mySalaryDetail",
      { groupId: that.data.groupId},
      "post", function (res) {
      console.log(res);
        var data = {
          "total": "1",
          "t": [
            {
              "month": "2019-05",
              "deductionSalary": "0.00", 
              "realSalary": "32100.00",
              "id": "4026201904110000019",
              "payableSalary": "32100.00",
              "status": "4"
            }
          ]
        }
      // var data = res.data.data;
      if (res.data.code == 0) {
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
  // 工资详情
  goWageDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails?groupId=' + this.data.groupId,
    })
  },

})