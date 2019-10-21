var app = getApp();
Page({
  data: {
    id:"",
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  onShow: function () {
    var that = this;
    // 公告列表
    app.wxRequest("gongguan/api/wechat/noticeDetail",
      { noticeId: that.data.id },
      "post", function (res) {
      console.log(res.data);
      var data = res.data.data;
      if (res.data.code == 0) {
        that.setData({
          ggData: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  onHide: function () {

  },
  
})