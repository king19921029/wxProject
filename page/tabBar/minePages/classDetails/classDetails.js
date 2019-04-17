var app = getApp();
Page({
  data: {
    addBoder:true,
    vipMsg:{},
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 基本情况
    app.wxRequest("gongguan/api/wechat/groupProjectDetail",
      { groupId:"4001201904140000001"},
      "post", function (res) {
        console.log("基本情况：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            vipMsg: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 班组人员列表
    app.wxRequest("gongguan/api/wechat/groupPersonnel",
      { groupId: "4001201904140000001" },
      "post", function (res) {
        console.log("基本情况：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            classPer: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
   
  },
  onHide: function () {

  },
  left_tap:function(){
    this.setData({
      addBoder:true
    })
  },
  right_tap:function(){
    this.setData({
      addBoder: false
    })
  },
  // 添加人员
  addTap:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/addPerson/addPerson'
    })
  },
  // 人员详情
  goDetails:function(e){
    let userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/page/tabBar/minePages/classPerDetails/classPerDetails?userId=' + userId
    })
  },

})