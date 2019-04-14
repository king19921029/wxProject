
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

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
  }

})