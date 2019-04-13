var app = getApp();
Page({
  data: {
    selectStatus: 0,
    headerBorder: true ,//header添加border
    addProject:{},//加入的项目
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 我管理的项目
    // app.wxRequest("gongguan/api/wechat/myManageProject",
    //   { },
    //   "post", function (res) {
    //     // console.log(res)

    //     if (res.data.code == 0) {

    //     } else {
    //       app.showLoading(res.data.msg, "none");
    //     }
    // })
    // 我加入的项目projectId、page、groupId
    app.wxRequest("gongguan/api/wechat/myJoinGroup",
      {},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            addProject:res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // header切换
  myProject: function () {
    this.setData({
      headerBorder: true
    })
  },
  youProject: function () {
    this.setData({
      headerBorder: false
    })
  },
  // 项目
  peojectTap: function () {
    var that = this;
    if (that.data.selectStatus == 1 ){
      this.setData({
        selectStatus: 0
      })
    }else{
      this.setData({
        selectStatus: 1
      })
    }
    
  },
  // 班组
  classTap: function () {
    var that = this;
    if (that.data.selectStatus == 2) {
      this.setData({
        selectStatus: 0
      })
    } else {
      this.setData({
        selectStatus: 2
      })
    }
  },
  // 添加成员
  addTap:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/classDetails/classDetails'
    })
  },
  //今日上班
  dayTap: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/projectDetails/projectDetails'
    })
  }


})