
Page({
  data: {
    addIsShow:false
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  addShow:function(){
    this.setData({
      addIsShow:true
    })
    wx.setNavigationBarTitle({
      title: '新建联系人'
    })
  },


})