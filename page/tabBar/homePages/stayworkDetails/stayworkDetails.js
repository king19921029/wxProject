var app = getApp();
Page({
  data: {
    blockIsShow:true,
    btnFont: "确定",
    details:{},//数据
    time: "获取验证码",
    countTime: 60,
    disabled: false,
  },
  onLoad: function (options) {

    var month = options.month.replace(/年/, "-").replace(/月/, "")
    this.setData({
      groupId: options.groupId,
      month: month,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    // 工作量明细
    app.wxRequest("gongguan/api/wechat/waitConfirmQuantityDetail",
      { groupId: that.data.groupId, month: that.data.month},
      "post", function (res) {
      console.log("明细", res.data.data);
      if (res.data.code == 0) {
        var data = res.data.data;
        wx.setNavigationBarTitle({
          title: that.data.month
        })
        that.setData({
          details: data[0]
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    // 获取解密token
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
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  onHide: function () {
  },
  // 确定
  confirmBtn: function (e) {
    var that = this;
    let codeVal = that.data.codeVal;
    let url = "gongguan/api/wechat/confirmQuantityStatus";
    let bodyData = {
      ids: that.data.details.id, 
    };
    let data = that.data.getIndex;
    let token = that.data.token;
    if (codeVal) {
      app.confirmaed(codeVal, url, bodyData, data, token)
    }else{
      app.showLoading("请输入确认密码", "none");
    }
    // 确认id、verificationCode
    // if (that.data.codeVal){
    //   app.wxRequest("gongguan/api/wechat/confirmQuantityStatus",
    //     { 
    //       ids: that.data.details.id, 
    //       verificationCode: that.data.codeVal
    //     },
    //     "post", function (res) {
    //       if (res.data.code == 0) {
    //         if (res.data.data) {
    //           wx.navigateBack()
    //         }
    //       } else {
    //         app.showLoading(res.data.msg, "none");
    //       }
    //   })
    // }else{
    //   app.showLoading("请输入验证码", "none");
    // }
  },
  // 获取输入的code
  get_val: function (e) {
    this.setData({
      codeVal: e.detail.value
    })
  },
  // 取消
  fno_tap: function () {
    this.setData({
      blockIsShow: true
    })
  },
  // 获取value
  fgetVal: function (e) {
    this.setData({
      codeVal: e.detail.val
    })
  },
  // 呼起浮层
  confirmationTap: function () {
    this.setData({
      blockIsShow: false
    })
  },

})