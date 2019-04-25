var app = getApp();
Page({
  data: {
    addIsShow:false
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 获取项目、班组
    app.wxRequest("gongguan/api/wechat/getEmergencyContacts",
      {},
      "post", function (res) {
        console.log("联系人列表：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            perList:res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  getName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  getPhone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getRelation: function (e) {
    this.setData({
      relation: e.detail.value
    })
  },
  // 添加联系人页面显示
  addShow:function(){
    this.setData({
      addIsShow:true
    })
    wx.setNavigationBarTitle({
      title: '新建联系人'
    })
  },
  // 确认
  footerTap:function(){
    var that = this;
    let name = that.data.name;
    let phone = that.data.phone;
    let relation = that.data.relation;
    app.wxRequest("gongguan/api/wechat/addEmergencyConstact",
      {
        name:name,
        phone:phone,
        relation: relation
      },
      "post", function (res) {
        console.log("联系人列表：", res.data.data)
        if (res.data.code == 0) {
          if( res.data.data ){
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              addIsShow:false
            })
            that.onShow();
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  }


})