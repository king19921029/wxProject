var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",//班组id
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: "动态设置的标题"
    })
    app.wxRequest("gongguan/api/wechat/myGroupQuantityDetail",
      { groupId:"4001201904100002001",page:""},
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
  //查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayworkDetails/stayworkDetails',
    })
  },

})