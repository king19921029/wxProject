var app = getApp();
Page({
  data: {
    blockIsShow: false,
    workTypeId:" 泥瓦工",
    workTypeName: [],
    workType: {},
    allData: {
      userName: "",
      workTypeName: ""
    },
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 工种
    app.wxRequest("gongguan/api/wechat/getWorkType",{},
    "post", function (res) {
      console.log("工种：", res.data.data)
      if (res.data.code == 0) {
        var data = res.data.data;
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          arr.push(data[i].name)
        }
        that.setData({
          workType: res.data.data,
          workTypeName: arr
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  //技能
  pickerSkill(e) {
    let data = this.data.workType;
    let wkType = "allData.workTypeName";
    let wkId = "allData.workTypeId";

    this.setData({
      [wkType]: this.data.workTypeName[e.detail.value],
      [wkId]: data[e.detail.value].id
    })
  },
  addPer:function(){
    var that = this;
    // 基本情况
    app.wxRequest("gongguan/api/wechat/addGroupPerson",
      { 
        groupId: that.data.groupId, 
        workTypeId: that.data.allData.workTypeId, 
        idNum: that.data.idNum 
      },
      "post", function (res) {
        console.log("基本情况：", res.data.data)
        if (res.data.code == 0) {
         wx.navigateBack()
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  getName(e){
    this.setData({
      names: e.detail.value
    })
  },
  getIdNum(e){
    var that = this;
    app.wxRequest("gongguan/api/wechat/getUserInfo", 
      { idNum: e.detail.value},
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            allData:res.data.data,
            idNum: e.detail.value
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },

})