
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 文化程度
  chageW:function(e){
    let val = e.detail.value;
    app.wxRequest("gongguan/api/wechat/bindBankCard",
    {},
    "post", function (res) {
      console.log(res.data);
      var data = res.data.data;
      if (res.data.code == 0) {
        if (data) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 1000
          })
        }
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })

  },
  // 去绑定银行卡
  go_bindBank:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/bindBankCard/bindBankCard'
    })
  },
  // 更改手机号
  go_changePhone: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/changePhone/changePhone'
    })
  },
  // 身份认证中心   authenticationAll
  go_authent:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/authenticationAll/authenticationAll'
    })
  },

})