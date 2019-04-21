var app = getApp();
Page({
  data: {
    blockIsShow: false,
    workTypeId:" 泥瓦工"
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    // getWorkType
    app.wxRequest("gongguan/api/wechat/getWorkType",
      {},
      "post", function (res) {
        console.log("工种信息：", res.data.data)
        if (res.data.code == 0) {
          
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  addPer:function(){
    var that = this;
    // 基本情况
    app.wxRequest("gongguan/api/wechat/addGroupPerson",
      { groupId: that.data.groupId, workTypeId: that.data.workTypeId, idNum: that.data.idNum },
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
      names
    })
  },
  getIdNum(e){
    this.setData({
      idNum: e.detail.value
    })
  },

})