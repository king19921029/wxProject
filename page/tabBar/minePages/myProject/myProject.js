var app = getApp();
Page({
  data: {
    selectStatus: 0,
    headerBorder: true ,//header添加border
    addProject:{},//加入的项目
    manageProject:{},//我管理的项目

  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 我管理的项目
    app.wxRequest("gongguan/api/wechat/myManageProject",
      { },
      "post", function (res) {
        console.log("管理项目数据：",res.data.data)

        if (res.data.code == 0) {
          that.setData({
            manageProject:res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 我加入的项目page、projectId、groupId
    app.wxRequest("gongguan/api/wechat/myJoinGroup",
      { page: "", projectId: "", groupId:""},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          var data = {
            "total": "1",
            "t": [
              {
                "groupName": "小程序大班组",
                "groupId": "4001201904140000001",
                "labourCompanyName": "北京广佳装饰公司丰台总部",
                "isAccredited": "1", 
                "projectAddress": "福建泉州",
                "projectName": "生态园建设",
                "projectId": "4034201904100007010",
                "userId": "4046201904140003001",
                "todayWork": true, 
                "labourContractId": "4034201904100007010"
              }
            ]
          }
          // var data = res.data.data;
          that.setData({
            addProject:data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 获取项目、班组
    app.wxRequest("gongguan/api/wechat/queryTerm",
      {},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            peojectData: res.data.data.project,
            classData: res.data.data.group,
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // header切换
  myProject: function () {
    this.setData({
      headerBorder: true
    })
  },
  youProject: function () {
    this.setData({
      headerBorder: false
    })
  },
  // 项目
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
  // 班组
  classTap: function () {
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
  // 添加成员
  addTap:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/classDetails/classDetails'
    })
  },
  //今日上班
  dayTap: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/projectDetails/projectDetails'
    })
  },
  // 项目下拉框点击
  projectSelectTap: function (e) {
    console.log(e.currentTarget.dataset.id)
  },
  // 班组下拉框点击
  classSelectTap:function(e){
    console.log(e.currentTarget.dataset.id)
  }


})