var app = getApp();
Page({
  data: {
    selectStatus: 0,
    peojectData: [],//项目数据
    companyData: [],//劳务公司数据
    classData: [],//班组数据
    peojectLIst: [],//项目考勤列表
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 获取所有项目
    app.wxRequest("gongguan/api/wechat/myProject",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          that.setData({
            peojectData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    // 获取所有劳务公司。参数projectId（选传）
    app.wxRequest("gongguan/api/wechat/myLabourCompany",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          that.setData({
            companyData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    // 获取所有班组。参数projectId（选传）
    app.wxRequest("gongguan/api/wechat/myLabourCompany",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          that.setData({
            classData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    // 我的项目考勤列表(projectId,labourCompany,groupId,page)
    app.wxRequest("gongguan/api/wechat/myAttendanceRecord",
      {},
      "post", function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            peojectLIst: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  // 项目
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
  // 劳务公司
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
  // 班组
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
  // 查看详情
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageBlockDetails/wageBlockDetails',
    })

  },


})