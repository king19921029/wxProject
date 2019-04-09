var app =getApp()
Page({
  data: {
    headerBorder:true,//header添加border
    blockIsShow:true,//浮层
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    var that = this;
    // 我的项目考勤列表
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrim",
      {},
      "post", function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            peojectLIst: res.data.data
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
  // 取消
  no_tap:function(){
    this.setData({
      blockIsShow: true
    })
  },
  // 去详情
  goDetails:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails',
    })
  }
})