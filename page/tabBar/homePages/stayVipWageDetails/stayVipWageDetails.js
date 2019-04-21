var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",//id
    month:"",//月份
    tabData:{},//表格数据
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
    app.wxRequest("gongguan/api/wechat/groupSalaryWaitConfirmDetail",
      { groupId: groupId, month: month,page:1},
      "post", function (res) {
        console.log("表格数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/groupSalaryDetailTotal",
      { groupId: groupId},
      "post", function (res) {
        console.log("明细汇总:",res.data.data)
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
  // 工资确定
  confirmBtn: function () {
    var that = this;
    // 我的工资确认id、verificationCode
    app.wxRequest("gongguan/api/wechat/groupConfirmSalary",
      {},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            // myWage: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  //查看详情
  goDetails: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails?id=' + id,
    })    
  },
  //多选框点击
  checkboxChange: function (e) {
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    let idx = e.currentTarget.dataset.idx;//下标
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
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].id)
    }
    var ids = arr.join(',');
    console.log(ids)
    // 全部确定
    app.wxRequest("gongguan/api/wechat/groupConfirmSalary",
      { id: ids, verificationCode:"111111" },
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
    var arr = [];
    for (var i = 0; i < data.length; i++) {

      if (data[i].isChecked) {
        arr.push(data[i].id)
      }
    }
    var ids = arr.join(',');
    console.log(ids)
    // 确定
    app.wxRequest("gongguan/api/wechat/groupConfirmSalary",
      { id: ids, verificationCode:"111111" },
      "post", function (res) {
        console.log("全部确定", res.data.data)
        if (res.data.code == 0) {
          if (res.data.data) {
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },

})