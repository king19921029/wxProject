var app = getApp();
var util = require('../../../../util/util.js');
Page({
  data: {
    userName:"",
    bankCardNum:null,
    openBank:"",
    cardType:"",
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  // 获取input val
  getInputVal:function(e){
    var that = this;
    let types = e.currentTarget.dataset.types;
    let val = e.detail.value;
    console.log(e.detail.value);
    if( types == 0 ){
      that.setData({
        bankCardNum:val
      })
    }else if(types == 1){
      that.setData({
        userName: val
      })
    }else{
      that.setData({
        openBank: val
      })
    }
    
  },
  //银行卡号
  getUserIdCardNumber: function (e) {
    this.setData({
      bankNumber: e.detail.value
    })
    var temp = util.bankCardAttribution(e.detail.value)
    console.log(temp)
    if (temp == Error) {
      temp.bankName = '';
      temp.cardTypeName = '';
    }else {
      this.setData({
        cardType: temp.bankName || ""
      })
    }
  },
  next:function(){
    var that = this;
    app.wxRequest("gongguan/api/wechat/bindBankCard",
      { 
        userName: that.data.userName,
        bankCardNum: that.data.bankNumber,
        openBank: that.data.cardType
      },
      "post", function (res) {
        console.log(res.data);
        var data = res.data.data;
        if (res.data.code == 0) {
          if( data ){
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
})