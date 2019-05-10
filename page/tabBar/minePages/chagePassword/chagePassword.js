
var util = require('../../../../util/encrypt.js');
import pass from "../../../../util/util.js"
function PrefixInteger(m) {
  return (Array(m).join(0)).slice(-m);
}
var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
   
  },
  onShow: function () {
    var that = this;
    // 解密
    app.wxRequest("gongguan/api/wechat/getIndex",
      {},
      "post", function (res) {
        console.log("getIndex", res.data.data)
        if (res.data.code == 0) {
          let token = app.globalData.token;
          that.setData({
            getIndex: res.data.data,
            token: token
          })
          console.log(app.getKey(res.data.data, token))
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  getval1: function (e) {
    this.setData({
      val1: e.detail.value
    })
  },
  getval2: function (e) {
    this.setData({
      val2: e.detail.value
    })
  },
  getOld:function(e){
    this.setData({
      oldVal: e.detail.value
    })
  },
  next: function () {
    var that = this;
    let val1 = that.data.val1;
    let val2 = that.data.val2;
    let oldVal = that.data.oldVal;
    const data = that.data.getIndex;
    const token = that.data.token;
    const key = app.getKey(data, token);
    if (!pass.isPasswd(val1)) {
      return false;
    }
    console.log(data)
    console.log(key)
    console.log(key.length)

    if (oldVal && val1 && val2 ){
      let newPassword1 = util.encrypt(key, val1)
      let newPassword2 = util.encrypt(key, val2)
      let oldPassword = util.encrypt(key, oldVal)
      app.globalData.header.newPassword1 = newPassword1
      app.globalData.header.newPassword2 = newPassword2
      app.globalData.header.oldPassword = oldPassword
      app.wxRequest("gongguan/api/wechat/resetPassword",
        {},
        "post", function (res) {
          if (res.data.code == 0) {
            if( res.data.data){
              wx.navigateBack()
            }
           
          } else {
            app.showLoading(res.data.msg, "none");
          }
        })
    }else{
      app.showLoading("每项都需要必填","none")
    }
    
  },
  go_retpass:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/retPassword/retPassword',
    })
  },

})