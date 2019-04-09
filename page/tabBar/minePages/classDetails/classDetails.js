
Page({
  data: {
    addBoder:true,
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  left_tap:function(){
    this.setData({
      addBoder:true
    })
  },
  right_tap:function(){
    this.setData({
      addBoder: false
    })
  },
  // 添加人员
  addTap:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/addPerson/addPerson'
    })
  },
  // 人员详情
  goDetails:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/classPerDetails/classPerDetails'
    })
  },

})