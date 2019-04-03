
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
  
})