var app = getApp();
Page({
  data: {
    workList:{},
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/queryJobWanted",
      {},
      "post", function (res) {
        console.log("求职信息：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            workList:{...res.data.data}
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  getVal: function (e) {
    this.setData({
      val: e.detail.value
    })
  },
  getList: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/infoFeedback",
      {},
      "post", function (res) {
        console.log("求职信息：", res.data.data)
        if (res.data.code == 0) {
         
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 去发布
  go_setWork:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/setWorkWanted/setWorkWanted'
    })
  },
  // 去修改
  go_changeWorkWanted: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/minePages/changeWorkWanted/changeWorkWanted?id='+id,
    })
  },

})