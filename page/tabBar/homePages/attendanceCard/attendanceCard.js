var app = getApp();
Page({
  data: {
    selectStatus: 0,
    userName:"",//打卡人
    imglist:[],
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userName: options.userName,
      day:options.day,
    })
  },
  onShow: function () {
    var that = this;
    // 打卡
    app.wxRequest("gongguan/api/wechat/clockDetail",
      { day: this.data.day },
      "post", function (res) {
        console.log("打卡", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            titleData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  listTap: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/attendanceProject/attendanceProject',
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(e.currentTarget.dataset.srcimg)
    var arr = [];
    arr.push(e.currentTarget.dataset.srcimg)
    wx.previewImage({
      current: e.currentTarget.dataset.srcimg, // 当前显示图片的http链接  
      urls: arr // 需要预览的图片http链接列表  
    })
  },

})