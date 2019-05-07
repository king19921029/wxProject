var app = getApp();
Page({
  data: {
    edArr: ["初中", "高中", "职高", "大专", "本科", "研究生"],
    workTypeName:[],
    workType:{},
    edType:"请选择文化程度",
    wkType:"请选择主要技能",
    bankData:{},
    allData:{},
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 工种
    app.wxRequest("gongguan/api/wechat/getWorkType",
      {},
      "post", function (res) {
        console.log("工种：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          var arr = [];
          for( var i = 0;i < data.length;i++ ){
            arr.push(data[i].name)
          }
          that.setData({
            workType: res.data.data,
            workTypeName:arr        
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 获取银行卡
    app.wxRequest("gongguan/api/wechat/getBankCard",
      {},
      "post", function (res) {
        console.log("银行卡：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            bankData:data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 页面数据
    app.wxRequest("gongguan/api/wechat/personnelCenter",
      {},
      "post", function (res) {
        console.log("页面数据：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            allData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {
    var that = this;
    let educationLevel = that.data.allData.edId || "";
    let skill = that.data.allData.wkId || "";
    if (educationLevel != "" || skill !=""){
      app.wxRequest("gongguan/api/wechat/savePersonalInfo",
        {
          skill: skill,
          educationLevel: educationLevel
        },
        "post", function (res) {
          console.log("保存资料:", res.data.data)
          if (res.data.code == 0) {

          } else {
            app.showLoading(res.data.msg, "none");
          }
        })
    }
  },
  onUnload:function(){
    var that = this;
    let educationLevel = that.data.allData.edId || "";
    let skill = that.data.allData.wkId || "";
    if (educationLevel != "" || skill != "") {
      app.wxRequest("gongguan/api/wechat/savePersonalInfo",
        {
          skill: skill,
          educationLevel: educationLevel
        },
        "post", function (res) {
          console.log("保存资料:", res.data.data)
          if (res.data.code == 0) {

          } else {
            app.showLoading(res.data.msg, "none");
          }
        })
    }
  },
  // 学历选择
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let edType = "allData.degreeEducation";
    let edId = "allData.edId";
    this.setData({
      [edId]: e.detail.value,
      [edType]: this.data.edArr[e.detail.value],
    })
  },
  //技能
  pickerSkill(e){
    let data = this.data.workType;
    let wkType = "allData.skill";
    let wkId = "allData.wkId";

    this.setData({
      [wkType]: this.data.workTypeName[e.detail.value],
      [wkId]: data[e.detail.value].id
    })
  },
  // 去绑定银行卡
  go_bindBank:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/bindBankCard/bindBankCard'
    })
  },
  // 更改手机号
  go_changePhone: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/changePhone/changePhone'
    })
  },
  // 身份认证中心   authenticationAll
  go_authent:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/authenticationAll/authenticationAll'
    })
  },
  // 确认密码
  go_pass:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/setPassword/setPassword'
    })
  },
  // 去修改密码
  go_chage:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/chagePassword/chagePassword'
    })
  }

})