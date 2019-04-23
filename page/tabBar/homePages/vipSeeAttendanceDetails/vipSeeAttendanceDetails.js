var app = getApp();
Page({
  data: {
    selectStatus: 0,
    groupId:"",
    tabData:{},//表格数据
    monthData:{},//月份数据
    personData:{},//人员数据
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    var groupId = that.data.groupId;
   
    // 月份
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceMonth",
      { groupId: groupId },
      "post", function (res) {
        console.log("月份：",res.data)
        if (res.data.code == 0) {
          that.setData({
            monthData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 所有人员
    app.wxRequest("gongguan/api/wechat/queryGroupPerson",
      { groupId: groupId  },
      "post", function (res) {
        console.log("班组人员：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            personData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 表格数据groupId、month、page、personId
    that.getList(groupId,"",1,"")
  },
  onHide: function () {

  },
  getList(groupId, month, page, personId){
    var that = this;
    // 表格数据groupId、month、page、personId
    app.wxRequest("gongguan/api/wechat/queryGroupPersonMonthAttendance",
      { groupId: groupId, month: month, page: page, personId: personId },
      "post", function (res) {
        console.log("表格数据：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            tabData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  //月份
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
  // 班组人员选择
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
  //查看详情
  goDetails: function (e) {
    let personId = e.currentTarget.dataset.personid;
    let month = e.currentTarget.dataset.month;
    wx.navigateTo({
      url: '/page/tabBar/homePages/vipSeeAttendanceProject/vipSeeAttendanceProject?groupId=' + this.data.groupId + "&personId=" + personId+"&month="+month,
    })
  },
  peojectList:function(e){
    let month = e.currentTarget.dataset.month;
    let groupId = this.data.groupId;
    if (month) {
      this.getList(groupId, month, 1, "")
    } else {
      this.getList(groupId, "", 1, "")
    }
    this.setData({
      selectStatus:0
    })
  },
  companyList: function (e) {
    let id = e.currentTarget.id;
    let groupId = this.data.groupId;
    if(id){
      this.getList(groupId, "", 1, id)
    }else{
      this.getList(groupId, "", 1, "")
    }
   
    this.setData({
      selectStatus: 0
    })
  },

})