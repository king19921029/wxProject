var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
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
    wx.navigateTo({
      url: "/page/tabBar/homePages/stayworkDetails/stayworkDetails?groupId=" + this.data.groupId + "&month=" + month
    })
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
  // 确定
  confirmTap: function () {
    var that = this;
    let data = that.data.tabData.t;
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].isChecked) {
        arr.push(data[i].id)
        console
      }
    }
    var ids = arr.join(',');
    console.log(ids)
    // 班组查看-确定
    app.wxRequest("gongguan/api/wechat/groupQuantityConfirm",
      { 
        groupId: that.data.groupId, 
        id: ids, 
        verificationCode: "111111" 
      },
      "post", function (res) {
        console.log("确定", res.data.data)
        if (res.data.code == 0) {
          if (res.data.data) {
            wx.navigateBack()
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 月份选择
  peojectList: function (e) {
    let month = e.currentTarget.dataset.month;
    console.log(month)
    
    if (month) {
      this.getList(this.data.groupId, 1, month, "", "")
    } else {
      this.getList(this.data.groupId, 1, "", "", "")
    }
    this.setData({
      selectStatus: 0
    })
  },
  // 班组人员选择
  companyList: function (e) {
    let personid = e.currentTarget.dataset.personid;
    console.log(personid)
    if (personid) {
      this.getList(this.data.groupId, 1, "", personid, "")
    } else {
      this.getList(this.data.groupId, 1, "", "", "")
    }
    this.setData({
      selectStatus: 0
    })
  },
  // 状态选择
  classList: function (e) {
    let status = e.currentTarget.dataset.status;
    console.log(status)
    if (status) {
      this.getList(this.data.groupId, 1, "", "", status)
    } else {
      this.getList(this.data.groupId, 1, "", "", "")
    }
    this.setData({
      selectStatus: 0
    })
  }

})