var app = getApp();
Page({
  data: {
    titleStatus:0,//title状态
    selectBox:false,
  },
  onLoad: function (options) {

  },
  onShow: function () {
    app.wxRequest("gongguan/api/wechat/myJoinGroup",
      {projectId:"",groupId:"",page:""},
      "post", function (res) {
        console.log(res)
        if (res.data.code == 0) {

        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
 
  //查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeWageDetails/vipSeeWageDetails',
    })
  },
  // 筛选
  screenTap:function(){
    this.setData({
      selectBox: !this.data.selectBox
    })
  },
  // 项目
  peojectTap: function () {
    this.setData({
      titleStatus: 0,
      selectBox:false
    })
  },
  // 考勤
  attendanceTap: function () {
    this.setData({
      titleStatus: 1,
      selectBox: false
    })
  },
  // 工作量
  workTap: function () {
    this.setData({
      titleStatus: 2,
      selectBox: false
    })
  },

})