var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",//id
    month:"",//月份
    tabData:{},//表格数据
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      month: options.month
    })
    wx.setNavigationBarTitle({
      title: "班组工资明细"
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId;
    let month = that.data.month;
    //表格 groupId、month、page
    app.wxRequest("gongguan/api/wechat/groupSalaryWaitConfirmDetail",
      { groupId: groupId, month: month,page:''},
      "post", function (res) {
        console.log("表格数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          // var data = {
          //   "total": "1",
          //   "t": [
          //     {
          //       "date": "2019-05",
          //       "differenceSalary": "0.00", 
          //       "realSalary": "32100.00", 
          //       "id": "4026201904110000019",
          //       "userName": "小程序",
          //       "userId": "4046201904110010001",
          //       "payableSalary": "32100.00", 
          //       "status": "2"
          //     }
          //   ]
          // }
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/groupSalaryDetailTotal",
      { groupId: groupId},
      "post", function (res) {
        console.log("明细汇总:",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          // var data = {
          //   "date": "2019-05",
          //   "groupName": "大班组A",
          //   "deductionSalary": "0.00", 
          //   "labourCompanyName": "北京广佳装饰公司丰台总部",
          //   "differenceSalary": "0.00", 
          //   "realSalary": "32100.00", 
          //   "projectName": "广佳丰台装饰",
          //   "groupId": "4001201904100002001",
          //   "payableSalary": "32100.00" 
          // }
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
  // 工资确定
  confirmBtn: function () {
    var that = this;
    // 我的工资确认id、verificationCode
    app.wxRequest("gongguan/api/wechat/groupConfirmSalary",
      {},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            // myWage: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  //查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails?groupId=' + this.data.groupId,
    })
  },

})