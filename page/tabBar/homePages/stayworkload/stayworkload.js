var app =getApp()
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
    //个人工作量待办
    app.wxRequest("gongguan/api/wechat/myQuantityWaitConfrim",
      {},
      "post", function (res) {
        console.log("个人工作量：",res.data.data);
        if (res.data.code == 0) {
          var data = {
            "total": "1",
            "t": [
              {
                "groupName": "大班组A",
                "quantity": "122.0", 
                "labourCompanyId": "4045201903280003005",
                "labourCompanyName": "小程序",
                "groupId": "4001201904100002001",
                "projectName": "小程序",
                "userName": "小程序",
                "projectId": "4034201904010004001",
                "startDate": "2019年04月"
              }
            ]
          }
          // var data = res.data.data;
          that.setData({
            perDetails: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    //班组工作量待办
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrim",
      {},
      "post", function (res) {
        console.log("班组工作量：",res.data.data);
        if (res.data.code == 0) {
          // var data = re.data.data;
          var data = {
            "total": "1",
            "t": [
              {
                "groupName": "大班组A",
                "quantity": "122.0",
                "labourCompanyId": "4045201903280003005",
                "labourCompanyName": "小程序",
                "groupId": "4001201904140000001",
                "projectName": "小程序",
                "projectId": "4034201904010004001",
                "startDate": "2019年04月"
              }
            ]
          }
          that.setData({
            vipDetails: data
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
  goDetails:function(e){
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=' + groupId,
    })
  },
  // 班组去详情
  classDetails: function (e) {
    let id = e.currentTarget.dataset.groupid
    let groupName = e.currentTarget.dataset.groupname;
    let titleDate = e.currentTarget.dataset.titledate;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipworkDetails/stayVipworkDetails?groupId=${id}&groupName=${groupName}&titleDate=${titleDate}`
    })
  }
})