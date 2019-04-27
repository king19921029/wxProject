var app = getApp()
Page({
  data: {
    blockIsShow: false,
    details:{},
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    var that = this;
    // 我加入的项目page、projectId、groupId
    app.wxRequest("gongguan/api/wechat/projectDetail",
      { groupId: that.data.groupId },
      "post", function (res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },

})