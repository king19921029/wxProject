var app = getApp();
Page({
  data: {
    btnFont:"提交劳务公司审核"
  },
  onLoad: function (options) {
    this.setData({
      groupId:options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/mySalaryWaitConfirmDetailTotal",
      { groupId: that.data.groupId},
      "post", function (res) {
      console.log("明细汇总", res.data.data)
     
      if (res.data.code == 0) {
        // var data = {
        //   "date": "2019-05",
        //   "groupName": "大班组A",
        //   "deductionSalary": "0.00", 
        //   "deductionSalary": "0.00", 
        //   "labourCompanyName": "北京广佳装饰公司丰台总部",
        //   "groupId": "4001201904100002001",
        //   "name": "侯1",
        //   "realSalary": "32100.00",
        //   "id": "4026201904110000019",
        //   "projectName": "广佳丰台装饰",
        //   "payableSalary": "32100.00"
        // }
        var data = res.data.data;
        that.setData({
          details: data
        })
        wx.setNavigationBarTitle({
          title: data.name+data.date
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  onHide: function () {

  },
})