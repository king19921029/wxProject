var app = getApp();
var util = require('../../../../util/encrypt.js');
Page({
  data: {
    classNum:"",
    daysNum:"",
    nigthNum:"",
    groupId:"", 
    id:"",
    blockIsShow: true,//浮层
    headerBorder: false,//header添加border
    time: "获取验证码",
    countTime: 60,
    disabled: false,
    codeVal: "",
  },
  onLoad: function (options) {
    let mineData = [];
    let obj = {
      classNum: options.classNum || "",
      daysNum: options.daysNum || "",
      nigthNum: options.nigthNum || "",
    };
    mineData.push(obj);
    console.log(options)
    this.setData({
      id: options.id,
      groupId: options.groupId || "",
      mineData: mineData,
      userPhone: app.globalData.userPhone
    })
  },
  onShow: function () {
    var that = this;
   
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
    if (that.data.groupId ){
      //班组tab数据
      app.wxRequest("gongguan/api/wechat/group4PersonAttenanceDetail",
        { groupId: that.data.groupId, id: that.data.id },
        "post", function (res) {
          console.log("班组考勤明细", res.data.data);
          if (res.data.code == 0) {
            var data = res.data.data;
            that.setData({
              tabData: data
            })
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      //tab数据
        app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirmDetail",
          { id: that.data.id },
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
            for (var i = 0; i < data.length; i++) {
              if (data[i].id == that.data.id) {
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
    }
    
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
    let codeVal = that.data.codeVal;
    let url = "gongguan/api/wechat/myAttendanceConfirm";
    let bodyData = {
      id: that.data.id
    }
    const data = that.data.getIndex;
    const token = that.data.token;
    app.confirmaed(codeVal, url,bodyData,data,token)

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
  },
  // ----------------------
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
  // 密码确认
  fconfirmTap: function () {
    var that = this;
    let codeVal = that.data.codeVal;
    
    const data = that.data.getIndex;
    const token = that.data.token;
    //确定
    if (codeVal){
      if (that.data.groupId) {
        var url = "gongguan/api/wechat/groupConfirmPersonAttendance";
        var bodyData = {
          groupId: that.data.groupId,
          ids: that.data.id,
        }
        app.confirmaed(codeVal, url, bodyData, data, token)
      } else {
        var url = "gongguan/api/wechat/myAttendanceConfirm";
        var bodyData = {
          id: that.data.id
        }
        app.confirmaed(codeVal, url, bodyData, data, token)
      }
     
    }else{
      app.showLoading("请输入确认密码","none")
    }
  },

})