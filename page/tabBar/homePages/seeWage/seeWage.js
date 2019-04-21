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
    // 获取项目、劳务公司、班组
    app.wxRequest("gongguan/api/wechat/queryTerm",
      {},
      "post", function (res) {
        console.log("header数据：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            peojectData: res.data.data.project,
            companyData: res.data.data.labourCompany,
            classData: res.data.data.group,
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 详情(projectId,labourCompany,groupId,page)
    app.wxRequest("gongguan/api/wechat/salaryList",
      {},
      "post", function (res) {
        console.log("列表：",res.data.data);
        var data =  {
          "total": "1",
          "t": [
            {
              "groupName": "大班组A",
              "deductionSalary": "0.00", 
              "labourCompanyName": "北京广佳装饰公司丰台总部",
              "groupId": "4001201904100002001",
              "realSalary": "32100.00",
              "id": "4026201904110000019",
              "projectName": "广佳丰台装饰",
              "payableSalary": "32100.00"
            }
          ]
        }
        // var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            peojectLIst: data
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
  goDetails: function (e) {
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageBlockDetails/wageBlockDetails?groupId=' + groupId,
    })

  },
  // qu搜索
  goSerach: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/serachPage/serachPage',
    })
  }


})