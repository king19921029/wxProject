var app = getApp();
Page({
  data: {
    blockIsShow: true,
    selectStatus: 0,
    groupId:"",//id
    month:"",//月份
    tabData:{},//表格数据
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      month: options.month,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId;
    let month = that.data.month;
    //表格 groupId、month、page
    app.wxRequest("gongguan/api/wechat/groupSalaryWaitConfirmDetail",
      { groupId: groupId, month: month,page:1},
      "post", function (res) {
        console.log("表格数据：",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 明细汇总
    app.wxRequest("gongguan/api/wechat/groupSalaryDetailTotal",
      { groupId: groupId},
      "post", function (res) {
        console.log("明细汇总:",res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            details: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {
  },
  //查看详情
  // goDetails: function (e) {
  //   let id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: '/page/tabBar/homePages/wageDetails/wageDetails?id=' + id,
  //   })    
  // },
  //多选框点击
  checkboxChange: function (e) {
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    let idx = e.currentTarget.dataset.idx;//下标
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
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].id)
    }
    var ids = arr.join(',');
    that.setData({
      ids: ids,
      blockIsShow:false
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
      ids: ids,
      blockIsShow: false
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
      { tel: that.data.userPhone, type: 2 },
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
      // 全部确定
      app.wxRequest("gongguan/api/wechat/groupConfirmSalary",
        { 
          ids: that.data.ids, 
          groupId: that.data.groupId,
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
    } else {
      app.showLoading("最少勾选一项", "none")
    }

  }

})