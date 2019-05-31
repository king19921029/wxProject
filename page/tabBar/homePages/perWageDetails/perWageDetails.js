  var app = getApp();
Page({
  data: {
    btnFont: "确认",
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/salaryDetailMonth",
      { id: that.data.id },
      "post", function (res) {
        console.log("工资确认", res.data.data)

        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
          wx.setNavigationBarTitle({
            title: data.month +"工资明细"
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
          let token = wx.getStorageSync("token");
          that.setData({
            getIndex: res.data.data,
            token: token
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 我的工资确认
  confirmBtn: function () {
    var that = this;
    let codeVal = that.data.codeVal;
    let url = "gongguan/api/wechat/confirmSalary";
    let bodyData = {
      id: that.data.id
    };
    let data = that.data.getIndex;
    let token = that.data.token;
    if (codeVal) {
      app.confirmaed(codeVal, url, bodyData, data, token)
      // 我的工资确认id、verificationCode
      // app.wxRequest("gongguan/api/wechat/confirmSalary",
      //   {
      //     id: that.data.id,
      //     verificationCode: that.data.codeVal
      //   },
      //   "post", function (res) {
      //     console.log("提交工资：", res.data.data)
      //     if (res.data.code == 0) {
      //       if (res.data.data) {
      //         wx.navigateBack({
      //           delta: 2,
      //         })
      //       }
      //     } else {
      //       app.showLoading(res.data.msg, "none");
      //     }
      // })
    }else{
      app.showLoading("请输入确认密码", "none");
    }
   
  },
  // 获取输入的code
  get_val: function (e) {
    this.setData({
      codeVal: e.detail.value
    })
  }
})