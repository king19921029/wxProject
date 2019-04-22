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
    // 个人工作量列表  (projectId,labourCompany,groupId,page)
    that.getList(1);
  },
  onHide: function () {

  },
  getList(page, projectId, labourCompany, groupId) {
    // 我的工作量列表(projectId,labourCompany,groupId,page)
    var that = this;
    app.wxRequest("gongguan/api/wechat/myQuantity",
      { page: page, projectId: projectId || "", labourCompany: labourCompany || "", groupId: groupId || "" },
      "post", function (res) {
        console.log("工作量列表：", res.data.data);

        var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            peojectLIst: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
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
  },
  // 项目选择
  peojectList: function (e) {
    let id = e.currentTarget.id;
    console.log(e.currentTarget.id)
    if (id) {
      this.getList(1, id);
    } else {
      this.getList(1);
    }
    this.setData({
      selectStatus: 0
    })
  },
  // 劳务公司选择
  companyList: function (e) {
    let id = e.currentTarget.id;
    console.log(id)
    if (id) {
      this.getList(1, "", id);
    } else {
      this.getList(1);
    }
    this.setData({
      selectStatus: 0
    })
  },
  // 劳务公司选择
  classList: function (e) {
    let id = e.currentTarget.id;
    console.log(id)
    if (id) {
      this.getList(1, "", "", id);
    } else {
      this.getList(1);
    }
    this.setData({
      selectStatus: 0
    })
  }

})