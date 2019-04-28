var app = getApp();
Page({
  data: {
    titleStatus:0,//title状态
    selectBox:false,
    attendanceData:[],//考勤数据
    workData:{},//工作量
    projectObj:{
      "name":"项目筛选",
      "id":""
    }
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    var that = this; 
    // 项目筛选
    app.wxRequest("gongguan/api/wechat/myManageProject",
      {},
      "post", function (res) {
      console.log("项目筛选：", res.data.data)
      if (res.data.code == 0) {
        that.setData({
          manageProject: res.data.data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    that.getList(1)
  },
  onHide: function () {
  },
  getList(page, projectId){
    var  that = this;
    // 工资
    app.wxRequest("gongguan/api/wechat/groupSalaryList",
      { page:page,projectId: projectId || "" },
      "post", function (res) {

        var data = res.data.data;
        console.log("工资：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            wageData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    // 考勤
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceToProject",
      { page:page,projectId: projectId || "" },
      "post", function (res) {
        console.log("考勤：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            attendanceData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    // 查看工作量
    app.wxRequest("gongguan/api/wechat/groupQuantity",
      { page:page,projectId: projectId || "" },
      "post", function (res) {
        var data = res.data.data;
        console.log("工作量：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            workData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  //工资查看详情
  wageDetails: function (e) {
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeWageDetails/vipSeeWageDetails?groupId=' + groupId,
    })
  },
  // 考勤查看详情
  attendanceDtails:function(e){
    let groupId = e.currentTarget.dataset.groupid;
    let groupName = e.currentTarget.dataset.groupname;
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeAttendanceDetails/vipSeeAttendanceDetails?groupId=' + groupId + "&groupName=" + groupName,
    })
  },
  // 去工作量详情
  goWork: function (e) {
    let groupId = e.currentTarget.dataset.groupid;
    let groupName = e.currentTarget.dataset.groupname;
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeWorkDetails/vipSeeWorkDetails?groupId=' + groupId + "&groupName=" + groupName,
    })
  },
  // 筛选
  screenTap:function(){
    this.setData({
      selectBox: !this.data.selectBox
    })
  },
  // 项目
  peojectTap: function () {
    this.setData({
      titleStatus: 0,
      selectBox:false
    })
  },
  // 考勤
  attendanceTap: function () {
    this.setData({
      titleStatus: 1,
      selectBox: false
    })
  },
  // 工作量
  workTap: function () {
    this.setData({
      titleStatus: 2,
      selectBox: false
    })
  },
 
  // 筛选
  projectLisre:function(e){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    var obj = {
      id:id||"",
      name:name||"项目筛选"
    }
    if(id){
      this.getList(1,id)
    }else{
      this.getList(1)
    }
    this.setData({
      selectBox:false,
      projectObj: obj
    })
  }

})