var app = getApp()
Page({
  data: {
    blockIsShow: false,
    details:{},
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 我加入的项目page、projectId、groupId
    app.wxRequest("gongguan/api/wechat/projectDetail",
      { groupId: "4001201904140000001" },
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