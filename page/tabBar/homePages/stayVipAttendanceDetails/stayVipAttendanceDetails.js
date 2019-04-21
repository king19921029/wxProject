var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",//班组id
    month:"",//月份
    allCheck:false,
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      month: options.month
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId;
    let month = that.data.month;
    //表格 groupId、month、page
    app.wxRequest("gongguan/api/wechat/queryGroupAttendaceDetail",
      { groupId: groupId, page:1, month: month,  },
      "post", function (res) {
      console.log("表格数据：",res.data.data)
      if (res.data.code == 0) {
          var data = res.data.data;
        //   var data2 = { "id": "4034201904010004001", "groupId": "4001201904170001003", "groupName": "大班组A", "isChecked": false, "daysNum": "2", "userId": "2069201904140006001", "month": "2019-04", "nigthNum": "2", "userName": "小程序用户", "classNum": "10" }
        // data.t.push(data2)
          that.setData({
            tabData: data
          })
      
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirmDetailTotle",
      { groupId:that.data.groupId},
      "post", function (res) {
        console.log("明细汇总：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
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
  //查看详情
  goDetails: function (e) {
    var that = this;
    let types = e.currentTarget.dataset.types;
    if( types == 0 ){
      return false;
    }
    let userId = e.currentTarget.dataset.userid;
    let month = that.data.month;
    let groupId = that.data.groupId;
    wx.navigateTo({
      url: `/page/tabBar/homePages/stayVipAttendanceProject/stayVipAttendanceProject?month=${month}&groupId=${groupId}&userId=${userId}`
    })
  },
  //多选框点击
  checkboxChange:function(e){
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    let idx = e.currentTarget.dataset.idx;//下标
    var tabData = 'tabData.t[' + idx + '].isChecked'
    this.setData({
      [tabData]: !isChecked
    })
  },
  // 全选
  allCheckbox:function(e){
    var data = this.data.tabData;
    var arr = data.t
    var allCheck = this.data.allCheck;
    this.setData({
      allCheck: !allCheck
    })
    if ( allCheck ){
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = false
      }
    }else{
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = true
      }
    }
    
    this.setData({
      tabData:data
    })
  },
  // 全部确定
  allConfirm:function(){
    var that = this;
    let data = that.data.tabData.t;
    var arr = [];
    for( var i = 0;i < data.length;i++ ){
      arr.push(data[i].id)
    }
    var ids = arr.join(','); 
    // 全部确定
    app.wxRequest("gongguan/api/wechat/groupConfirmPersonAttendance",
      { groupId: that.data.groupId,ids:ids},
      "post", function (res) {
      console.log("全部确定", res.data.data)
      if (res.data.code == 0) {
        wx.navigateBack()
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  // 确定
  confirmTap:function(){
    var that = this;
    let data = that.data.tabData.t;
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      
      if (data[i].isChecked){
        arr.push(data[i].id)
      }
    }
    var ids = arr.join(',');
    console.log(ids)
    // 确定
    app.wxRequest("gongguan/api/wechat/groupConfirmPersonAttendance",
      { groupId: that.data.groupId, ids: ids },
      "post", function (res) {
        console.log("全部确定", res.data.data)
        if (res.data.code == 0) {
          if( res.data.data ){
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },


})