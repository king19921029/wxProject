var app = getApp();
Page({
  data: {
    blockIsShow: true,
    selectStatus: 0,
    groupId:"",//班组id
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      groupName: options.groupName,
      titleDate: options.titleDate,
      userPhone: app.globalData.userPhone,
      month: options.month.replace(/年/, "-").replace(/月/, "")
    })
    wx.setNavigationBarTitle({
      title: `${options.titleDate}`
    })
  },
  onShow: function () {
    var that = this;
    // 项目汇总
    app.wxRequest("gongguan/api/wechat/myGroupQuantityWaitConfrimDetailTotal",
      { groupId: that.data.groupId, month: that.data.month},
      "post", function (res) {
        console.log("tab上面的数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            vipDetails: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // tab数据
    app.wxRequest("gongguan/api/wechat/myGroupQuantityDetail",
      { groupId: that.data.groupId, page: "", month: that.data.month},
      "post", function (res) {
        console.log("tab数据：",res.data.data)
      if (res.data.code == 0) {
        var data = res.data.data;
        that.setData({
          tabData: data
        })
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
  },
  //查看详情
  // goDetails: function (e) {
  //   let id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: "/page/tabBar/homePages/stayworkvipDetails/stayworkvipDetails?id=" + id + "&groupId=" + this.data.groupId
  //   })
  // },
  //多选框点击
  checkboxChange: function (e) {
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    let idx = e.currentTarget.dataset.idx;//下标
    console.log(e.currentTarget.dataset)
    var tabData = 'tabData.t[' + idx + '].isChecked'
    this.setData({
      [tabData]: !isChecked
    })
  },
  // 全选
  allCheckbox: function (e) {
    var data = this.data.tabData;
    var arr = data.t
    var allCheck = this.data.allCheck;
    this.setData({
      allCheck: !allCheck
    })
    if (allCheck) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = false
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        arr[i].isChecked = true
      }
    }

    this.setData({
      tabData: data
    })
  },
  // 全部确定
  allConfirm: function () {
    var that = this;
    let data = that.data.tabData.t;
    let groupId = that.data.groupId;
    let month = that.data.titleDate.replace('年', '-').replace('月', '');
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].id)
    }
    var ids = arr.join(',');
    that.setData({
      blockIsShow: false,
      ids: ids
    })
  },
  // 确定
  confirmTap: function () {
    var that = this;
    let data = that.data.tabData.t;
    var arr = [];
    for (var i = 0; i < data.length; i++) {

      if (data[i].isChecked) {
        arr.push(data[i].id)
      }
    }
    var ids = arr.join(',');
    that.setData({
      blockIsShow: false,
      ids: ids
    })

  },
  // 取消
  no_tap: function () {
    this.setData({
      blockIsShow: true
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
      { tel: that.data.userPhone, type: 3 },
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
  },
  // 确定
  confirmBtn: function () {
    var that = this;
    if (that.data.ids) {
      if (that.data.codeVal){
        // 全部确定
        app.wxRequest("gongguan/api/wechat/groupQuantityConfirm",
          {
            groupId: that.data.groupId,
            ids: that.data.ids,
            verificationCode: that.data.codeVal
          },
          "post", function (res) {
            console.log("全部确定", res.data.data)
            if (res.data.code == 0) {
              wx.navigateBack()
            } else {
              app.showLoading(res.data.msg, "none");
            }
        })
      }else{
        app.showLoading("请输入验证码", "none")
      }
      
    } else {
      app.showLoading("最少勾选一项", "none")
    }

  }

})