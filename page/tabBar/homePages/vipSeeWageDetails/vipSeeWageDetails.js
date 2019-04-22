var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 月份(groupId必传)
    app.wxRequest("gongguan/api/wechat/groupSalaryMonthList",
      { groupId: that.data.groupId },
      "post", function (res) {
        // var data = res.data.data;
      console.log("月份：",res.data.data)
      var data = ["2019-04"]

      if (res.data.code == 0) {
        that.setData({
          headerDate: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 班组人员(groupId必传)
    app.wxRequest("gongguan/api/wechat/groupQuantityPerson",
      { groupId: that.data.groupId},
      "post", function (res) {
        var data = res.data.data;
        console.log("班组人员：",res.data.data)
  
        if (res.data.code == 0) {
          that.setData({
            perData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 状态(groupId必传)
    app.wxRequest("gongguan/api/wechat/salaryStatus",
      { groupId: that.data.groupId },
      "post", function (res) {
        var data = res.data.data;
        console.log("状态：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            statusData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/groupSalary",
      { groupId: that.data.groupId },
      "post", function (res) {
        var data = res.data.data;
        console.log("明细汇总：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            details: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 表格
    app.wxRequest("gongguan/api/wechat/groupSalaryDetail",
      { page: "", groupId: that.data.groupId, month: "", personId: "", Status:"" },
      "post", function (res) {
        var data = res.data.data;
        console.log("tabs数据：", res.data.data)
        if (res.data.code == 0) {
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
  // 月份
  peojectTap: function () {
    var that = this;
    if (that.data.selectStatus == 1) {
      this.setData({
        selectStatus: 0
      })
    } else {
      this.setData({
        selectStatus: 1
      })
    }

  },
  // 班组人员
  companyTap: function () {
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
  // 状态
  classTap: function () {
    var that = this;
    if (that.data.selectStatus == 3) {
      this.setData({
        selectStatus: 0
      })
    } else {
      this.setData({
        selectStatus: 3
      })
    }
  },
  //查看详情
  goDetails: function () {
    // wx.navigateTo({
    //   url: '/page/tabBar/homePages/wageBlockDetails/wageBlockDetails',
    // })
  },
  // tab点击
  goWageDetails: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageDetails/wageDetails?id=' + id
    })
  },


})