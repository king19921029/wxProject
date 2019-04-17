var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",//班组id
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      groupName: options.groupName,
      titleDate: options.titleDate
    })
    wx.setNavigationBarTitle({
      title: `${options.titleDate}`
    })
  },
  onShow: function () {
    var that = this;
    // 详情
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrimDetailTotal",
      { groupId: that.data.groupId},
      "post", function (res) {
        console.log("tab上面的数据：",res.data.data)
        if (res.data.code == 0) {
          // var data = res.data.data;
          var data = {
            "groupName": "大班组A", 
            "quantity": "122.0", 
            "labourCompanyId": "4045201903280003005", 
            "labourCompanyName": "小程序", 
            "groupId": "4001201904140000001", 
            "projectName": "小程序", 
            "projectId": "4034201904010004001", 
            "startDate": "2019年04月" 
          }

          that.setData({
            vipDetails: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细
    app.wxRequest("gongguan/api/wechat/myGroupQuantityDetail",
      { groupId: that.data.groupId, page: "" },
      "post", function (res) {
      if (res.data.code == 0) {
        // var data = res.data.data;
        var data = {
          "total": "1",
          "t": [
            {
              "quantity": "122 ", 
              "workTypeName": "混林土工", 
              "subPro": "框架浇筑", 
              "userName": "小程序", 
              "startDate": "2019-04", 
              "status": "4"
            }
          ]
        }
        that.setData({
          tabDetails: data
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
    wx.navigateTo({
      url: "/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=" + this.data.groupId
    })
  },

})