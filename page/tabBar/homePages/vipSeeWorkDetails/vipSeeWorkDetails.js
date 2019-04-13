var app = getApp();
Page({
  data: {
    selectStatus: 0
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 月份(groupId必传)
    app.wxRequest("gongguan/api/wechat/groupQuantityMonth",
      { groupId:"4001201904100002001"},
      "post", function (res) {
        // var data = res.data.data;
        // console.log(res.data.data)
        var data = ["2019-04"]

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
      { groupId: "4001201904100002001" },
      "post", function (res) {
        // var data = res.data.data;
        // console.log(res.data.data)
        var data = [
          {
            "userName": "小程序",
            "userId": "2070201904010001002"
          }
        ]
        if (res.data.code == 0) {
          that.setData({
            perData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 状态 暂无接口(groupId必传)

    // 班组查看工作量（projectId）
    app.wxRequest("gongguan/api/wechat/groupQuantity",
      { projectId: "" },
      "post", function (res) {
        // var data = res.data.data;
        var data = {
          "total": "1",
          "t": [
            {
              "groupName": "大班组A",
              "quantity": "122.0",
              "labourCompanyId": "4045201903280003005",
              "labourCompanyName": "小程序",
              "groupId": "1",
              "projectName": "小程序",
              "projectId": "4034201904010004001",
              "status": "4"
            }
          ]
        }
        console.log(res.data.data)
        if (res.data.code == 0) {
          that.setData({
            workData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })

    // 表格
    app.wxRequest("gongguan/api/wechat/groupQuantityDetail",
      { groupId: "4001201904100002001" },
      "post", function (res) {
      //  var data = res.data.data;
        var data = {
            "total": "1",
            "t": [
                {
                    "quantity": "122 ", 
                    "workTypeName": "混林土工", 
                    "subPro": "框架浇筑", 
                    "userName": "小程序", 
                    "userId": "2070201904010001002",
                    "startDate": "2019-04", 
                    "status": "4"
                }
            ]
        }

        if (res.data.code == 0) {
          that.setData({
            detailsData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

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
  goDetails: function () {
    wx.navigateTo({
      url: '/page/tabBar/homePages/wageBlockDetails/wageBlockDetails',
    })
  },

})