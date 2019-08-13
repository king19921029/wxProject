var app = getApp();
var util = require('../../../../util/util.js');
Page({
  data: {
    flag:"0",
    userName:"",
    bankCardNum:null,
    openBank:"",
    cardType:"",
    branch:"",
    bankNet:"",
    bankData:{},
  },
  onLoad: function (options) {
    this.setData({
      userName: app.globalData.name
    })
    var that = this;
    // 获取银行卡
    app.wxRequest("gongguan/api/wechat/getBankCard",
      {},
      "post", function (res) {
        console.log("银行卡：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          if (data.flag ){
            that.setData({
              flag: data.flag
            })
          }else{
            that.setData({
              bankData: data,
              bankName: data.bankName || ""
            })
          }
         
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  bankSuccess(e){
    var that = this;
    console.log(e.detail)
    let banknum = 'bankData.bankCardNum'

    if (e.detail.number) {
      console.log(48,e.detail.numbe)
      this.setData({
        flag: "1"
      })
    }
    this.setData({
      bankCardNum: e.detail.number,
      [banknum]: e.detail.number,
    })
    
    app.wxRequest("gongguan/api/wechat/getBankName", {
      bankCardNum: e.detail.number
    },
      "post", function (res) {
        console.log("银行卡：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            bankName: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onShow: function () {
   
  },
  // 6227000181380371642
  get_carname(){
    var that = this;
    app.wxRequest("gongguan/api/wechat/getBankName", {
      bankCardNum: that.data.bankCardNum
    },
      "post", function (res) {
        console.log("银行卡：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            bankName: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  // 获取input val
  getInputVal:function(e){
    var that = this;
    let types = e.currentTarget.dataset.types;
    let val = e.detail.value;
    console.log(e.detail.value);
    if( types == 0 ){
      that.setData({
        bankCardNum:val
      })
    }else if(types == 1){
      that.setData({
        userName: val
      })
    }else{
      that.setData({
        openBank: val
      })
    }
    
  },
  //银行卡号
  getUserIdCardNumber: function (e) {
    this.setData({
      bankCardNum: e.detail.value
    })
    var temp = util.bankCardAttribution(e.detail.value)
    console.log(temp)
    if (temp == Error) {
      temp.bankName = '';
      temp.cardTypeName = '';
    }else {
      this.setData({
        openBank: temp.bankName || ""
      })
    }
  },
  // 分行
  getbranch(e){
    let val = e.detail.value;
    this.setData({
      branch:e.detail.value
    })
  },
  // 支行
  getbankNet(e){
    let val = e.detail.value;
    this.setData({
      bankNet: e.detail.value
    })
  },
  //下一步
  next:function(){
    var that = this;
    let userName = that.data.userName;
    let bankCardNum = that.data.bankCardNum;
    let bankName = that.data.bankName;
 
    if (userName && bankCardNum && bankName ){
      app.wxRequest("gongguan/api/wechat/bindBankCard",
        {
          userName: that.data.userName,
          bankCardNum: that.data.bankCardNum,
          openBank: bankName,
          // branch: branch,
          // bankNet: bankNet
        },
        "post", function (res) {
          console.log(res.data);
          var data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 1000
              })
              wx.navigateBack()
            }
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      wx.showToast({
        title: '请正确填写信息',
        icon:"none",
        duration: 1000
      })
    }
    
  },
  // 解绑
  untieTap:function(){
    this.setData({
      bankData:{},
      bankName:"",
      flag:1
    })
  }
})