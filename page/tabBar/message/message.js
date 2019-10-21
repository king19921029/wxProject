var app = getApp();
Page({
  data: {
    headerBorder:true,
    ggData:{},
    zpData:{},
    city:"",
  },
  onLoad: function (options) {
   
  },
  onShow: function () {
    var that = this;
    this.setData({
      city: app.globalData.city,
      cityCode: app.globalData.cityCode || ""
    })
    // 招聘
    app.wxRequest("gongguan/api/wechat/recruitmentList",
      { city: that.data.cityCode || "",page:"" },
      "post", function (res) {
        console.log(res);
        var data = res.data.data;
        console.log("招聘信息：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            zpData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 公告列表
    app.wxRequest("gongguan/api/wechat/noticeList",
      { page: "" },
      "post", function (res) {
        console.log(res);
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
  // 公告
  noticeTap:function(){
    this.setData({
      headerBorder: true
    })
  },
  //招聘 
  recruitTap:function(){
    this.setData({
      headerBorder:false
    })
  },
  // 去城市
  goCity:function(){
    wx.navigateTo({
      url: '/page/tabBar/messagePages/city/city',
    })
  },
  // 公告详情
  ggDetails:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/tabBar/messagePages/ggDetails/ggDetails?id=' + id,
    })
  },
  // 招聘详情
  zpDetails:function(e){
    wx.navigateTo({
      url: '/page/tabBar/messagePages/zpDetails/zpDetails?id='+e.currentTarget.dataset.id,
    })
  },

  
})