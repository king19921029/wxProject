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
    let groupId = that.data.groupId
    // 月份(groupId必传)
    app.wxRequest("gongguan/api/wechat/groupQuantityMonth",
      { groupId: groupId},
      "post", function (res) {
        var data = res.data.data;
        console.log("月份：",res.data.data)
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
      { groupId: groupId },
      "post", function (res) {
        var data = res.data.data;
        console.log("班组人员:",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            perData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 状态 暂无接口(groupId必传)
    app.wxRequest("gongguan/api/wechat/salaryStatus",
      { groupId: groupId },
      "post", function (res) {
        var data = res.data.data;
        console.log("状态人员:", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            statusData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })

    // 班组查看工作量（projectId）
    app.wxRequest("gongguan/api/wechat/groupQuantity",
      { projectId: "" },
      "post", function (res) {
        var data = res.data.data;
        console.log("列表：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            workData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 表格
    app.wxRequest("gongguan/api/wechat/groupQuantityDetail",
      { groupId: groupId, page: "", month: "", status: "", personId:"" },
      "post", function (res) {
        var data = res.data.data;
        console.log("表格数据：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            detailsData: data
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
  goDetails: function (e) {
    let month = e.currentTarget.dataset.month;
    wx.navigateTo({
      url: "/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=" + this.data.groupId + "&month=" + month
    })
  },

})