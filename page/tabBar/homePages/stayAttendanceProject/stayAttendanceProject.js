var app = getApp();
Page({
  data: {
    id:"",
    blockIsShow: true,//浮层
    headerBorder: false,//header添加border
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
    //tab数据
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirmDetail",
      { id: that.data.id},
      "post", function (res) {
        console.log("表格数据：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    //考勤明细
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirm",
      { page: 1 },
      "post", function (res) {
        console.log("考勤明细", res.data.data);
        if (res.data.code == 0) {
         
          var arr = [];
          var data = res.data.data.t;
          for( var i = 0;i<data.length;i++ ){
            if (data[i].id == that.data.id ){
              arr.push(data[i])
            }
          }
          that.setData({
            mineData: arr
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // 呼起浮层
  confirmationTap: function () {

    this.setData({
      blockIsShow: false
    })
  },
  // 浮层取消
  no_tap: function () {
    this.setData({
      blockIsShow: true
    })
  },
  // 浮层确定
  confirmaedTap: function () {
    var that = this;
    //确定
    app.wxRequest("gongguan/api/wechat/myAttendanceConfirm",
      { id: that.data.id, verificationCode: that.data.codeVal },
      "post", function (res) {
        console.log("确认考勤：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
          if (data) {
            that.setData({
              blockIsShow: true
            })
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
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
      { tel: that.data.userPhone,type:4 },
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