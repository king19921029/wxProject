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
    // 班组工资待确认数量
    app.wxRequest("gongguan/api/wechat/groupSalaryWaitConfirmCount",
      {},
      "post", function (res) {
        console.log("班组工资待确认数量:",res.data.data)
        if (res.data.code == 0) {
          if (res.data.isLeader ){
            that.perData();
            that.classData();
          }else{
            that.perData();
          }
          that.setData({
            vipNum: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
   
  },
  // 我的工资
  perData:function(){
    var that = this;
    app.wxRequest("gongguan/api/wechat/mySalaryWaitConfirm",
      {},
      "post", function (res) {
        console.log("我的工资：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            myWage: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 班组工资列表
  classData:function(){
    var that = this;
    app.wxRequest("gongguan/api/wechat/myGroupSalaryWaitConfirm",
      {},
      "post", function (res) {
        console.log("班组工资列表:", res.data.data)

        if (res.data.code == 0) {
          var data = res.data.data;

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
  confirmationTap:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      blockIsShow: false,
      id: e.currentTarget.dataset.id
    })
  },
  confirmBtn: function (e) {
    var that = this;
    // 我的工资确认id、verificationCode
    app.wxRequest("gongguan/api/wechat/confirmSalary",
      { id: that.data.id, verificationCode:"111111" },
      "post", function (res) {
        console.log("提交工资：", res.data.data)
        if (res.data.code == 0) {
          if( res.data.data ){
            wx.navigateBack()
          }
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
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/perWageDetails/perWageDetails?id=' + id,
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