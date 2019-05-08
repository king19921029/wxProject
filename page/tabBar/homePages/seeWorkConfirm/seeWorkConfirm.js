var app = getApp();
Page({
  data: {
    btnFont: "确定",
    details: {},//数据
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      groupId: options.groupId,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    // 工作量明细
    app.wxRequest("gongguan/api/wechat/quantityDetailList",
      { id: that.data.id },
      "post", function (res) {
        console.log("明细", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          wx.setNavigationBarTitle({
            title: data.month+"工作量确认"
          })
          that.setData({
            details: data
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
  confirmTap: function () {
    var that = this;
    let codeVal = that.data.codeVal;
    let url = "gongguan/api/wechat/confirmQuantityStatus";
    let bodyData = {
      ids: that.data.id
    };
    let data = that.data.getIndex;
    let token = that.data.token;
    if (codeVal){
      app.confirmaed(codeVal, url, bodyData, data, token)
      // 确定
      // app.wxRequest("gongguan/api/wechat/confirmQuantityStatus",
      //   {
      //     ids: id,
      //     verificationCode: that.data.codeVal
      //   },
      //   "post", function (res) {
      //     console.log("全部确定", res.data.data)
      //     if (res.data.code == 0) {
      //       wx.navigateBack({
      //         delta: 2,
      //       })
      //     } else {
      //       app.showLoading(res.data.msg, "none");
      //     }
      // })
    }else{
      app.showLoading("请输入确认密码", "none");
    }
    
  },
  // 获取验证吗
  getCode: function () {
    var that = this;
    // 验证码倒计时
    that.setData({
      disabled: true
    })
    var countTime = that.data.countTime
    var interval = setInterval(function () {
      countTime--
      that.setData({
        time: countTime + 's'
      })
      if (countTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          countTime: 60,
          disabled: false
        })
      }
    }, 1000)
    app.wxRequest("gongguan/front/isSendSmsCode.action",
      { tel: that.data.userPhone, type: 6 },
      "post", function (res) {
        console.log("验证码：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;

        } else {
          app.showLoading(res.data.msg, "none");
        }
      })

  },
  // 获取输入的code
  get_val: function (e) {
    this.setData({
      codeVal: e.detail.value
    })
  }
})