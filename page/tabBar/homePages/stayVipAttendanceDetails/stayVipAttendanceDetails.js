var app = getApp();
Page({
  data: {
    blockIsShow:true,
    selectStatus: 0,
    groupId:"",//班组id
    month:"",//月份
    allCheck:false,
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      month: options.month,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId;
    let month = that.data.month;
    //表格 groupId、month、page
    app.wxRequest("gongguan/api/wechat/queryGroupAttendaceDetail",
      { groupId: groupId, page:1, month: month,  },
      "post", function (res) {
      console.log("表格数据：",res.data.data)
      if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            tabData: data
          })
      
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/queryGroupAttendanceWaitConfirmDetailTotle",
      { groupId: that.data.groupId, month: that.data.month},
      "post", function (res) {
        console.log("明细汇总：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })

    // 获取解密token
    app.wxRequest("gongguan/api/wechat/getIndex",
      {},
      "post", function (res) {
        console.log("getIndex", res.data.data)
        if (res.data.code == 0) {
          let token = wx.getStorageSync("token");
          that.setData({
            getIndex: res.data.data,
            token: token
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {
  },
  //查看详情
  goDetails: function (e) {
    let id = e.currentTarget.dataset.id;
    let groupId = this.data.groupId;
    let classNum = e.currentTarget.dataset.classnum,
        daysNum = e.currentTarget.dataset.daysnum,
        nigthNum = e.currentTarget.dataset.nigthnum;
    console.log(classNum, daysNum, nigthNum)
    
    wx.navigateTo({
      url: '/page/tabBar/homePages/stayAttendanceProject/stayAttendanceProject?id=' + id + "&groupId=" + groupId + "&classNum=" + classNum + "&daysNum=" + daysNum + "&nigthNum=" + nigthNum,
    })
  },
  //多选框点击
  checkboxChange:function(e){
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    let idx = e.currentTarget.dataset.idx;//下标
    var tabData = 'tabData.t[' + idx + '].isChecked'
    this.setData({
      [tabData]: !isChecked
    })
  },
  // 全选
  allCheckbox:function(e){
    var data = this.data.tabData;
    var arr = data.t
    var allCheck = this.data.allCheck;
    this.setData({
      allCheck: !allCheck
    })
    if ( allCheck ){
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = false
      }
    }else{
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = true
      }
    }
    
    this.setData({
      tabData:data
    })
  },
  // 全部确定
  allConfirm:function(){
    var that = this;
    let data = that.data.tabData.t;
    var arr = [];
    for( var i = 0;i < data.length;i++ ){
      arr.push(data[i].id)
    }
    var ids = arr.join(','); 
    that.setData({
      blockIsShow: false,
      ids: ids
    })
  },
  // 确定
  confirmTap:function(){
    var that = this;
    let data = that.data.tabData.t;
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      
      if (data[i].isChecked){
        arr.push(data[i].id)
      }
    }
    var ids = arr.join(',');
    that.setData({
      blockIsShow: false,
      ids: ids
    })
    
  },
  // 取消
  fno_tap: function () {
    this.setData({
      blockIsShow: true
    })
  },
  // 获取value
  fgetVal: function (e) {
    this.setData({
      codeVal: e.detail.val
    })
  },
  // 密码确认
  fconfirmTap:function(){
    var that = this;
    if (that.data.ids) {
      let codeVal = that.data.codeVal;
      let url = "gongguan/api/wechat/groupConfirmPersonAttendance";
      let bodyData = {
        groupId: that.data.groupId,
        ids: that.data.ids,
      }
      const data = that.data.getIndex;
      const token = that.data.token;
      app.confirmaed(codeVal, url, bodyData, data, token)
    }else {
      app.showLoading("最少勾选一项", "none")
    }
    
  },
  // 确定
  confirmBtn:function(){
    var that = this;
    if (that.data.ids ){
      if (that.data.codeVal) {
        app.wxRequest("gongguan/api/wechat/groupConfirmPersonAttendance",
          {
            groupId: that.data.groupId,
            ids: that.data.ids,
            verificationCode: that.data.codeVal
          },
          "post", function (res) {
            console.log("确定", res.data.data)
            if (res.data.code == 0) {
              wx.navigateBack()
            } else {
              app.showLoading(res.data.msg, "none");
            }
        })
      }else{
        app.showLoading("请输入验证码", "none")
      }
      
    }else{
      app.showLoading("最少勾选一项","none")
    }
    
  }


})