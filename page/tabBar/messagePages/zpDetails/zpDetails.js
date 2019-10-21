var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  onShow: function () {
    // 招聘
    var that = this;
    app.wxRequest("gongguan/api/wechat/getRecruitmentDetail",
      {id:that.data.id},
      "post", function (res) {
        console.log(res);
        var data = res.data.data;
        console.log("招聘信息：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            zpData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.zpData.phone
    })
  }

})