var app =getApp()
Page({
  data: {
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
    //班组工作量待办
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrim",
      {},
      "post", function (res) {
        var data = {
          "total": "1",
          "t": [
            {
              "groupName": "大班组A", 
                "quantity": "122.0", 
                "labourCompanyId": "4045201903280003005", 
                "labourCompanyName": "小程序", 
                "groupId": "1", 
                "projectName": "小程序", 
                "projectId": "4034201904010004001", 
                "startDate": "2019年04月" 
            }
          ]
        }

        console.log(res.data.data);
        if (res.data.code == 0) {
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
    let id = e.currentTarget.datset.groupid
    console.log(id)
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=' + id,
    })
  },
  // 去详情
  classDetails: function (e) {
    let id = e.currentTarget.dataset.groupid
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayVipworkDetails/stayVipworkDetails?groupId='+id,
    })
  }
})