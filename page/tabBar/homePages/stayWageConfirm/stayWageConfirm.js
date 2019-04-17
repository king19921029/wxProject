var app = getApp();
Page({
  data: {
    headerBorder:true,//header添加border
    blockIsShow:true,//浮层
    myWage:{},//我的工资列表
    vipWage:{},//班组工资
    vipNum:{},//班组工资待确认数量
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 我的工资
    app.wxRequest("gongguan/api/wechat/mySalaryWaitConfirm",
      {},
      "post", function (res) {
        console.log("我的工资：",res.data.data)
        if (res.data.code == 0) {
          // var data = {
          //   "data": [
          //     {
          //       "date": "2019-05",
          //       "groupName": "大班组A",
          //       "deductionSalary": "0.00", 
          //       "deductionSalary": "0.00", 
          //       "labourCompanyName": "北京广佳装饰公司丰台总部",
          //       "groupId": "4001201904100002001",
          //       "name": "侯1",
          //       "realSalary": "32100.00",
          //       "id": "4026201904110000019",
          //       "projectName": "广佳丰台装饰",
          //       "payableSalary": "32100.00"
          //   }
          //   ],
          //   "mySalaryCount": "1"
          // }
          var data = res.data.data;
          that.setData({
            myWage:data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 班组工资待确认数量
    app.wxRequest("gongguan/api/wechat/groupSalaryWaitConfirmCount",
      {},
      "post", function (res) {
        console.log("班组工资待确认数量:",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            vipNum: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 班组工资列表
    app.wxRequest("gongguan/api/wechat/myGroupSalaryWaitConfirm",
      {},
      "post", function (res) {
        console.log("班组工资列表:",res.data.data)

        if (res.data.code == 0) {
          var data = res.data.data;
          // var data = {
          //   "code": "0",
          //   "data": [
          //     {
          //       "date": "2019-05",
          //       "groupName": "大班组A",
          //       "deductionSalary": "0.00", 
          //       "labourCompanyName": "北京广佳装饰公司丰台总部",
          //       "differenceSalary": "0.00", 
          //       "realSalary": "32100.00", 
          //       "projectName": "广佳丰台装饰",
          //       "groupId": "4001201904140000001",
          //       "payableSalary": "32100.00" 
          //     }
          //   ],
          //   "msg": "",
          //   "visible": true,
          //   "success": true
          // }
          that.setData({
            vipWage: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // header切换
  myWage:function(){
    this.setData({
      headerBorder:true
    })
  },
  youWage: function () {
    this.setData({
      headerBorder: false
    })
  },
  // 确定事件
  confirmationTap:function(){
    this.setData({
      blockIsShow: false
    })
  },
  confirmBtn:function(){
    var that = this;
    // 我的工资确认id、verificationCode
    app.wxRequest("gongguan/api/wechat/confirmSalary",
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
  // 取消
  no_tap:function(){
    this.setData({
      blockIsShow: true
    })
  },
  //个人详情
  perDetails: function (e) {
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails?groupId=' + groupId,
    })
  },
  //班组详情
  classDetails: function (e) {
    let month = e.currentTarget.dataset.month;
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipWageDetails/stayVipWageDetails?month=${month}&groupId=${groupId}`
    })
  },
})