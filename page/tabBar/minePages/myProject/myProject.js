var app = getApp();
Page({
  data: {
    selectStatus: 0,
    headerBorder: true ,//header添加border
    addProject:{},//加入的项目
    manageProject:{},//我管理的项目
    projectObj:{
      name:"项目筛选",
      id:""
    },
    classObj:{
      name:"班组名称",
      id:""
    }
  },
  onLoad: function (options) {
    if (options.types == "3" ){
      this.setData({
        headerBorder:false
      })
    }
  },
  previewImage: function (e) {
    var id = e.target.dataset.id;
    app.wxRequest("gongguan/api/wechat/getConcatList",
      {id:id},
    "post", function (res) {
      console.log("图片：", res.data.data)
      if (res.data.code == 0) {
        
        wx.previewImage({
          current: res.data.data[0], // 当前显示图片的http链接  
          urls: res.data.data // 需要预览的图片http链接列表  
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })


    
  },
  onShow: function () {
    var that = this;
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
    that.getManageProject();
    that.getAddProject(1,"","","");
  },
  // 管理的项目
  getManageProject:function(){
    var that = this;
    // 我管理的项目
    app.wxRequest("gongguan/api/wechat/myManageProject",
      {},
      "post", function (res) {
        console.log("管理项目数据：", res.data.data)

        if (res.data.code == 0) {
          that.setData({
            manageProject: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  //加入的项目
  getAddProject: function (page, projectId, groupId) {
    var that = this;
    // 我加入的项目page、projectId、groupId
    app.wxRequest("gongguan/api/wechat/myJoinGroup",
      { page: 1, projectId: projectId, groupId: groupId },
      "post", function (res) {
        console.log("我加入的项目：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            addProject: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // header切换
  myProject: function () {
    this.setData({
      headerBorder: true,
      selectStatus:0
    })
  },
  youProject: function () {
    this.setData({
      headerBorder: false,
      selectStatus: 0
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
  addTap:function(e){
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/minePages/classDetails/classDetails?groupId=' + groupId
    })
  },
  //今日上班
  dayTap: function (e) {
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: '/page/tabBar/minePages/projectDetails/projectDetails?groupId=' + groupId
    })
  },
  // 项目下拉框点击
  projectSelectTap: function (e) {
    var that = this;
    let page = 1;
    // 项目id
    let id = e.currentTarget.dataset.id || "";
    let name = e.currentTarget.dataset.name || "";
    // 班组id
    let groupId = that.data.classObj.id || "";

    var obj = {
      name: name || "项目筛选",
      id:id || ""
    }
    this.getAddProject(page, id, groupId)
    this.setData({
      selectStatus: 0,
      projectObj:obj
    })
    
  },
  // 班组下拉框点击
  classSelectTap:function(e){
    var that = this;
    let page = 1;
    console.log(e.currentTarget.dataset)
    // 项目id
    let id = that.data.projectObj.id || "";
    // 班组id
    let groupId = e.currentTarget.dataset.id || "";
    let name = e.currentTarget.dataset.name || "";

    var obj = {
      name: name || "班组名称",
      id: groupId || ""
    }
    this.getAddProject(page, id, groupId)
    this.setData({
      selectStatus: 0,
      classObj: obj
    })

  },
  todayWork:function(e){
    var that = this;
    let id = e.currentTarget.dataset.id;
    console.log(e);
    // 获取项目、班组
    app.wxRequest("gongguan/api/wechat/todayWork",
      { groupId:id},
    "post", function (res) {
      console.log(res.data.data)
      if (res.data.code == 0) {
        if(res.data.data){
          that.onShow();
        }
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  }


})