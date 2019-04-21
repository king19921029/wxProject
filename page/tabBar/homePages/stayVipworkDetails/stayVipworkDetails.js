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
    // 项目汇总
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrimDetailTotal",
      { groupId: that.data.groupId},
      "post", function (res) {
        console.log("tab上面的数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            vipDetails: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // tab数据
    app.wxRequest("gongguan/api/wechat/myGroupQuantityDetail",
      { groupId: that.data.groupId, page: "" },
      "post", function (res) {
        console.log("tab数据：",res.data.data)
      if (res.data.code == 0) {
        var data = res.data.data;
        that.setData({
          tabData: data
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
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/page/tabBar/homePages/stayworkvipDetails/stayworkvipDetails?id=" + id + "&groupId=" + this.data.groupId
    })
  },
  //多选框点击
  checkboxChange: function (e) {
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    let idx = e.currentTarget.dataset.idx;//下标
    console.log(e.currentTarget.dataset)
    var tabData = 'tabData.t[' + idx + '].isChecked'
    this.setData({
      [tabData]: !isChecked
    })
  },
  // 全选
  allCheckbox: function (e) {
    var data = this.data.tabData;
    var arr = data.t
    var allCheck = this.data.allCheck;
    this.setData({
      allCheck: !allCheck
    })
    if (allCheck) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = false
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = true
      }
    }

    this.setData({
      tabData: data
    })
  },
  // 全部确定
  allConfirm: function () {
    var that = this;
    let data = that.data.tabData.t;
    let groupId = that.data.groupId;
    let month = that.data.titleDate.replace('年', '-').replace('月', '');
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].id)
    }
    var ids = arr.join(',');
    // 全部确定
    app.wxRequest("gongguan/api/wechat/groupQuantityConfirm",
      { groupId: groupId, month:month,ids: ids, verificationCode: "111111" },
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
  confirmTap: function () {
    var that = this;
    let data = that.data.tabData.t;
    let groupId = that.data.groupId;
    let month = that.data.titleDate.replace('年', '-').replace('月', '');
    var arr = [];
    for (var i = 0; i < data.length; i++) {

      if (data[i].isChecked) {
        arr.push(data[i].id)
      }
    }
    var ids = arr.join(',');
    console.log(ids)
    // 确定
    app.wxRequest("gongguan/api/wechat/groupQuantityConfirm",
      { groupId: groupId, month: month, ids: ids, verificationCode: "111111" },
      "post", function (res) {
        console.log("全部确定", res.data.data)
        if (res.data.code == 0) {
          wx.navigateBack()
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },

})