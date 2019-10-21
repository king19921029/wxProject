var app = getApp();
Page({
  data: {
    selectStatus: 0,
    monthObj: {
      name: "月份",
      id: ""
    },
    companyObj: {
      name: "班组人员选择",
      id: ""
    },
    classObj: {
      name: "状态",
      id: ""
    },
    blockIsShow: true,
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      groupName: options.groupName,
      userPhone: app.globalData.userPhone
    })
    wx.setNavigationBarTitle({
      title: options.groupName+"工作量"
    })
  },
  onShow: function () {
    var that = this;
    let groupId = that.data.groupId
    // 月份(groupId必传)
    app.wxRequest("gongguan/api/wechat/groupQuantityMonth",
      { groupId: groupId},
      "post", function (res) {
        var data = res.data.data;
        console.log("月份：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            headerDate: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 班组人员(groupId必传)
    app.wxRequest("gongguan/api/wechat/groupQuantityPerson",
      { groupId: groupId },
      "post", function (res) {
        var data = res.data.data;
        console.log("班组人员:",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            perData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 状态(groupId必传)
    app.wxRequest("gongguan/api/wechat/salaryStatus",
      { groupId: groupId },
      "post", function (res) {
        var data = res.data.data;
        console.log("状态人员:", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            statusData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })

    // tab上面数据（projectId）
    app.wxRequest("gongguan/api/wechat/groupQuantity",
      { projectId: "" },
      "post", function (res) {
        var data = res.data.data;
        console.log("列表：",res.data.data)
        if (res.data.code == 0) {
          that.setData({
            workData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 表格
    that.getList(groupId,1,"","","")
  },
  // 获取列表
  getList: function (groupId, page, month, status, personId){
    var that = this;
    // 表格
    app.wxRequest("gongguan/api/wechat/groupQuantityDetail",
      { groupId: groupId, page: page, month: month, status: status, personId: personId },
      "post", function (res) {
        var data = res.data.data;
        console.log("表格数据：", res.data.data)
        if (res.data.code == 0) {
          var arr = data.t;
          for (var i = 0; i < arr.length; i++) {
            arr[i].isChecked = false
          }
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
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
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].id)
    }
    var ids = arr.join(',');
    that.setData({
      ids: ids,
      blockIsShow: false,
    })
  },
  // 呼出浮层
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
    console.log(ids)
    that.setData({
      ids:ids,
      blockIsShow: false
    })
  },
  // 月份
  peojectTap: function () {
    var that = this;
    if (that.data.selectStatus == 1 ){
      this.setData({
        selectStatus: 0
      })
    }else{
      this.setData({
        selectStatus: 1
      })
    }
   
  },
  // 班组人员
  companyTap: function () {
    var that = this;
    if (that.data.selectStatus == 2) {
      this.setData({
        selectStatus: 0
      })
    } else {
      this.setData({
        selectStatus: 2
      })
    }
  },
  // 状态
  classTap: function () {
    var that = this;
    if (that.data.selectStatus == 3) {
      this.setData({
        selectStatus: 0
      })
    } else {
      this.setData({
        selectStatus: 3
      })
    }
  },
  //查看详情
  goDetails: function (e) {
    let month = e.currentTarget.dataset.month;
    // wx.navigateTo({
    //   url: "/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=" + this.data.groupId + "&month=" + month
    // })
  },
  //多选框点击
  checkboxChange: function (e) {
    let isChecked = e.currentTarget.dataset.ischecked;//是否选中
    console.log(isChecked)
    let idx = e.currentTarget.dataset.idx;//下标
    var tabData = 'tabData.t[' + idx + '].isChecked'
    this.setData({
      [tabData]: !isChecked
    })
  },
  // 月份选择
  peojectList: function (e) {
    var that = this;
    // 月份
    let month = e.currentTarget.dataset.month || "";
    // 班组id
    let groupId = that.data.groupId;
    // 人员id
    let personid = that.data.companyObj.id || "";
    // 状态
    let status = that.data.classObj.id || "";
    // 分页
    let page = 1;

    var obj = {
      name: month || "月份",
      id: month
    }
    that.getList(groupId, page, month, status,personid)

    that.setData({
      selectStatus: 0,
      monthObj: obj
    })
  },
  // 班组人员选择
  companyList: function (e) {
    var that = this;
    // 月份
    let month = that.data.monthObj.id || "";
    // 班组id
    let groupId = this.data.groupId;
    // 人员id
    let personid = e.currentTarget.dataset.personid || "";
    let name = e.currentTarget.dataset.name;
    // 状态
    let status = that.data.classObj.id || "";
    // 分页
    let page = 1;


    var obj = {
      name: name || "班组人员选择",
      id: personid || ""
    }

    that.getList(groupId, page, month, status, personid)

    this.setData({
      selectStatus: 0,
      companyObj: obj
    })
  },
  // 状态选择
  classList: function (e) {
    var that = this;
    // 月份
    let month = that.data.monthObj.id || "";
    // 班组id
    let groupId = that.data.groupId;
    // 人员id
    let personid = that.data.companyObj.id || "";
    // 状态
    let status = e.currentTarget.dataset.status || "";
    // 分页
    let page = 1;

    var obj = {
      name: status || "状态",
      id: status
    }
    that.getList(groupId, page, month, status, personid)
    this.setData({
      selectStatus: 0,
      classObj: obj
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
      { tel: that.data.userPhone },
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
      app.wxRequest("gongguan/api/wechat/groupQuantityConfirm",
        {
          ids: that.data.ids,
          groupId: that.data.groupId,
          verificationCode: that.data.codeVal
        },
        "post", function (res) {
          console.log("确定", res.data.data)
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