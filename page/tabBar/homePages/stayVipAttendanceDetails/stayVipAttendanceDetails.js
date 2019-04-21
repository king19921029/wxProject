var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"4001201904140000001",//班组id
    month:"2019-04",//月份
  },
  onLoad: function (options) {
    // this.setData({
    //   groupId: options.groupId,
    //   month: options.month
    // })
    wx.setNavigationBarTitle({
      title: "某班组考勤汇总"
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId;
    let month = that.data.month;
    //表格 groupId、month、page
    app.wxRequest("gongguan/api/wechat/queryGroupAttendaceDetail",
      { groupId: groupId, page: '', month: month,  },
      "post", function (res) {
      console.log("表格数据：",res.data.data)
      if (res.data.code == 0) {
          // var data = res.data.data;
          var data = {
            "total": "1",
            "t": [
              {
                "nigthNum": "2",
                "month": "2019-04",
                "classNum": "10",
                "userName": "小程序用户",
                "daysNum": "2",
                "userId": "2070201904010001002",
                "status": 4
              },
              {
                "nigthNum": "1",
                "month": "2019-04",
                "classNum": "10",
                "userName": "小程序",
                "daysNum": "2",
                "userId": "2070201904010001002",
                "status": 4
              }
            ]
          }
          var arr = data.t;
          for (var i = 0; i < arr.length; i++) {
            console.log(arr[i])
            arr[i].isChecked = false
          }
          that.setData({
            tabData: data
          })
      
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 表格上面的数据
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirmDetailTotle",
      { groupId:that.data.groupId},
      "post", function (res) {
        console.log("表格上面的数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          if( data.length == 0 || !data ){
            var data = {
              "groupName": "大班组A",
              "month": "2019-04",
              "labourCompanyId": "4045201903280003005",
              "groupId": "1",
              "labourCompanyName": "小程序劳务公司",
              "classNum": "10", 
              "projectName": "小程序项目",
              "projectId": "4034201904010004001"
            }
            that.setData({
              details: data
            })
          }
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
      url: `/page/tabBar/homePages/stayVipAttendanceProject/stayVipAttendanceProject?month=${month}&groupId=${groupId}&userId=${userId}&titles=班组考勤明细`
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
    for (var i = 0; i < arr.length;i++ ){
      arr[i].isChecked = !arr[i].isChecked
    }
    this.setData({
      tabData:data
    })
  }

})