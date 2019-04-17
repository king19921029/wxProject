var app = getApp();
Page({
  data: {
    selectStatus: 0,
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 获取项目、劳务公司、班组
    app.wxRequest("gongguan/api/wechat/queryTerm",
      {},
      "post", function (res) {
        console.log("title数据：",res.data.data)
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
    // 个人工作量列表   (projectId,labourCompany,groupId,page)
    app.wxRequest("gongguan/api/wechat/myQuantity",
      { projectId: "", labourCompanyId: "",groupId:"",page:""},
      "post", function (res) {
        var data = {
          "total": "1",
          "t": [
            {
              "groupName": "大班组A",
              "quantity": "122.0",
              "labourCompanyId": "4045201903280003005",
              "labourCompanyName": "小程序",
              "groupId": "4001201904140000001",
              "projectName": "小程序",
              "userName": "小程序",
              "projectId": "4034201904010004001",
              "startDate": "2019年04月"
            }
          ]
        }

        // var data = res.data.data
        console.log("工作量列表：",res.data.data);
        if (res.data.code == 0) {
          that.setData({
            peojectLIst:data
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
    if (that.data.selectStatus == 1){
      that.setData({
        selectStatus: 0
      })
    }else{
      that.setData({
        selectStatus: 1
      })
    }
   
  },
  // 劳务公司
  companyTap: function () {
    var that = this;
    if (that.data.selectStatus == 2) {
      that.setData({
        selectStatus: 0
      })
    } else {
      that.setData({
        selectStatus: 2
      })
    }
  },
  // 班组
  classTap: function () {
    var that = this;
    if (that.data.selectStatus == 3) {
      that.setData({
        selectStatus: 0
      })
    } else {
      that.setData({
        selectStatus: 3
      })
    }
  },
  //查看详情
  goDetails: function (e) {
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/homePages/seeWorkDetails/seeWorkDetails?groupId=' + groupId,
    })
  },
  // qu搜索
  goSerach: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/serachPage/serachPage',
    })
  }

})