var app = getApp();
Page({
  data: {
    selectStatus: 0,
    peojectData: [],//项目数据
    companyData: [],//劳务公司数据
    classData: [],//班组数据
    peojectLIst: [],//项目考勤列表
    prjectObj: {
      name: "项目",
      id: ""
    },
    companyObj: {
      name: "劳务公司",
      id: ""
    },
    classObj: {
      name: "班组",
      id: ""
    },
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
    that.getList(1);
  },
  getList(page, projectId, labourCompany, groupId) {
    // 我的工资列表(projectId,labourCompany,groupId,page)
    var that = this;
    app.wxRequest("gongguan/api/wechat/salaryList",
      { 
        page: page, 
        projectId: projectId || "", 
        labourCompany: labourCompany || "",
        groupId: groupId || "" 
      },
      "post", function (res) {
        console.log("工资列表：", res.data.data);
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
  // 项目选择
  peojectList: function (e) {
    var that = this;
    let page = 1;
    // 项目id
    let projectId = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    // 劳务公司
    let labourCompany = that.data.companyObj.id;
    // 班组
    let groupId = that.data.classObj.id;

    that.getList(page, projectId, labourCompany, groupId)
    var obj = {
      name: name || "项目",
      id: projectId || ""
    }
    this.setData({
      selectStatus: 0,
      prjectObj: obj
    })
  },
  // 劳务公司选择
  companyList: function (e) {
    var that = this;
    let page = 1;
    // 项目id
    let projectId = that.data.prjectObj.id;
    // 劳务公司
    let labourCompany = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    // 班组
    let groupId = that.data.classObj.id;

    that.getList(page, projectId, labourCompany, groupId)
    var obj = {
      name: name || "劳务公司",
      id: labourCompany || ""
    }
    this.setData({
      selectStatus: 0,
      companyObj: obj
    })

  },
  // 劳务公司选择
  classList: function (e) {
    var that = this;
    let page = 1;
    // 项目id
    let projectId = that.data.prjectObj.id;
    // 劳务公司
    let labourCompany = that.data.companyObj.id;
    // 班组
    let groupId = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;

    that.getList(page, projectId, labourCompany, groupId)
    var obj = {
      name: name || "班组",
      id: groupId || ""
    }
    this.setData({
      selectStatus: 0,
      classObj: obj
    })
  },


})