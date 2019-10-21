var app = getApp();
Page({
  data: {
    val:"",
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  getVal:function(e){
    this.setData({
      val: e.detail.value
    })
  },
  // 确认
  footerTap: function () {
    var that = this;
    let val = that.data.val;
    app.wxRequest("gongguan/api/wechat/infoFeedback",
      {
        msg: val
      },
      "post", function (res) {
        console.log("反馈：", res.data.data)
        if (res.data.code == 0) {
          if (res.data.data) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack();   
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  }

})