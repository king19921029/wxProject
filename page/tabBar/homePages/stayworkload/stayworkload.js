var app = getApp()
Page({
  data: {
    perDetails:{},//个人工作量
    vipDetails:{},//班组工作量
    headerBorder:true,//header添加border
    blockIsShow:true,//浮层
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    var that = this;
    // 待确认数量
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrimCount",
      {},
      "post", function (res) {
        console.log("待确认数量：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            vipNum: data
          })
          if (data.isLeader){
            that.perData(1);
            that.classData(1);
          }else{
            that.perData(1);
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  //个人工作量待办
  perData:function(page){
    var that = this;
    app.wxRequest("gongguan/api/wechat/myQuantityWaitConfrim",
      {page:page},
    "post", function (res) {
      console.log("个人工作量：", res.data.data);
      if (res.data.code == 0) {

        var data = res.data.data;
        that.setData({
          perDetails: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  // 班组工作量待办
  classData:function(page){
    var that = this;
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrim",
      {page:page},
      "post", function (res) {
        console.log("班组工作量：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            vipDetails: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
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
  // 取消
  no_tap:function(){
    this.setData({
      blockIsShow: true
    })
  },
  // 确定
  confirmBtn: function (e) {
    var that = this;
    // 我的工资确认id、verificationCode
    app.wxRequest("gongguan/api/wechat/confirmSalary",
      { id: that.data.id, verificationCode: "111111" },
      "post", function (res) {
        console.log("提交工资：", res.data.data)
        if (res.data.code == 0) {
          if (res.data.data) {
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  // 个人去详情
  goDetails:function(e){
    let groupId = e.currentTarget.dataset.groupid;
    let month = e.currentTarget.dataset.month;
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=' + groupId + "&month=" + month,
    })
  },
  // 班组去详情
  classDetails: function (e) {
    let id = e.currentTarget.dataset.groupid
    let groupName = e.currentTarget.dataset.groupname;
    let titleDate = e.currentTarget.dataset.titledate;
    let month = e.currentTarget.dataset.titledate;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipworkDetails/stayVipworkDetails?groupId=${id}&groupName=${groupName}&titleDate=${titleDate}&month=${month}`
    })
  }
})