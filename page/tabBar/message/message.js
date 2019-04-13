
Page({
  data: {
    headerBorder:true
  },
  onLoad: function (options) {

  },
  onShow: function () {

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
  ggDetails:function(){
    wx.navigateTo({
      url: '/page/tabBar/messagePages/ggDetails/ggDetails',
    })
  },
  // 招聘详情
  zpDetails:function(){
    wx.navigateTo({
      url: '/page/tabBar/messagePages/zpDetails/zpDetails',
    })
  },

  
})