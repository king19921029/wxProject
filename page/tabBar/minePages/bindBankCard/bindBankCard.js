var app = getApp();
Page({
  data: {
    userName:"",
    bankCardNum:null,
    openBank:"",
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 绑定银行卡userName、bankCardNum、openBank
  nextTap:function(){
    var that = this;
    let userName = that.data.userName;
    let bankCardNum = that.data.bankCardNum;
    let openBank = that.data.openBank;
    app.wxRequest("gongguan/api/wechat/bindBankCard",
      { },
      "post", function (res) {
      console.log(res.data.data)
      if (res.data.code == 0) {
        var data = {
          "total": "1",
          "t": [
            {
              "groupName": "小程序大班组",
              "groupId": "4001201904140000001",
              "labourCompanyName": "北京广佳装饰公司丰台总部",
              "isAccredited": "1",
              "projectAddress": "福建泉州",
              "projectName": "生态园建设",
              "projectId": "4034201904100007010",
              "userId": "4046201904140003001",
              "todayWork": true,
              "labourContractId": "4034201904100007010"
            }
          ]
        }
        // var data = res.data.data;
        that.setData({
          addProject: data
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
})