var app = getApp();
Page({
  data: {
    headerBorder:true,
    ggData:{},
    city:"",
  },
  onLoad: function (options) {
   
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     // console.log(res)
    //   }
    // })
  },
  onShow: function () {
    var that = this;
    this.setData({
      city: app.globalData.city
    })
    // 公告列表
    app.wxRequest("gongguan/api/wechat/noticeList",
      { page:"" },
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
  zpDetails:function(){
    wx.navigateTo({
      url: '/page/tabBar/messagePages/zpDetails/zpDetails',
    })
  },

  
})