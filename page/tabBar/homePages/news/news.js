var app = getApp();
Page({
  data: {
    msg:{},
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    var that = this;
    // 消息列表
    app.wxRequest("gongguan/api/wechat/getMsg",
      { },
      "post", function (res) {
        console.log(res);
        var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            msg: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  go_details:function(){
    wx.navigateTo({
      url: '/page/tabBar/homePages/newDetails/newDetails'
    })
  }

})