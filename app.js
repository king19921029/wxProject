var util = require('./util/encrypt.js');
App({
  // 全局数据，类似于store
  globalData: {
    city: "北京",//城市
    userPhone: "",
    openid: null,
    token: "",
    url: 'http://www.jinbionline.com',
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "version": "0",
      "openId": "",
      "authorization": ""
    },
  },
  onLaunch: function (opts) {
    var that = this;
    let token = wx.getStorageSync("token") || "";
    let userPhone = wx.getStorageSync("userPhone") || "";
    that.globalData.header["authorization"] = token;
    that.globalData.token = token;
    that.globalData.userPhone = userPhone;
    // 获取设备
    wx.getSystemInfo({
      success: function (res) {
        let windowSize = {
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        }
        that.globalData.windowSize = windowSize;
        if (res.model.search('iPhone X') != -1) {
          that.globalData.isIpx = true;
        } else {
          that.globalData.isIpx = false;
        }
        wx.setStorageSync("model", res.platform)
        that.globalData.model = res.platform
      }
    })
  },
  onShow: function (opts) {
  },
  //封装的请求方法
  wxRequest: function (url, param, method, success, fail) {
    var that = this;
    if (url.indexOf('https') != 0) {
      url = this.globalData.url + '/' + url
    }
    param = param || {}
    method = method
    
    wx.request({
      header: this.globalData.header,
      url: url,
      data: param,
      method: method,
      success: function (res) {
        if (res.data.code == 10003 ){
          that.go_login()
          wx.removeStorageSync("token")
          return false;
        }
        typeof success == 'function' && success(res)
      },
      fail: function (res) {
        typeof fail == 'function' && fail(res)
        console.log(res);
      }
    })

  },
  go_login:function(){
    wx.navigateTo({
      url: '/page/tabBar/login/login',
    })
  },
  //打开loading
  showLoading: function (title, types) {
    wx.showToast({
      title: title,
      icon: types
    });
  },
  // 打开loading并跳转
  showLoading2: function (title, types) {
    wx.showToast({
      title: title,
      icon: types
    });
    setTimeout(()=>{
      wx.navigateBack()
    },1000)
  },
  // 浮层确定
  confirmaed: function (codeVal,url,bodyData,data,token) {
   
    //确定
    if (codeVal) {
      // let key = token.substring(data.index1, data.index2)
      let key = this.getKey(data, token)
      console.log(key)
      let password = util.encrypt(key, codeVal)
      bodyData.password = password
      this.wxRequest(url, bodyData,
        "post", function (res) {
          console.log("确认考勤：", res.data.data);
          if (res.data.code == 0) {
            if (res.data.data) {
              wx.navigateBack()
            }
          } else {
            this.showLoading(res.data.msg, "none");
          }
      })
    } else {
      this.showLoading("请输入确认密码", "none")
    }
  },
  // 获取key
  getKey: function (data, token){

    var key = "";
    if (data.index2 > token.length) {
      let idx = data.index2 - token.length;
      //补0 
      let test = idx + 1;
      let z = (Array(test).join(0)).slice(-test);
      key = token.substring(data.index1) + z
    } else {
      key = token.substring(data.index1, data.index2)
    }
    return key;
  },
  // 路由带参
  router(types,url,data){
    if ( data instanceof Object ) {
      if (data instanceof Array ){
        this.routerTpye(types, url, "arrData", data)
        console.log("Array")
      }else{
        data = JSON.stringify(data)
        this.routerTpye(types, url, "objData", data)
        console.log("Object")
      }
    }else if (typeof data == "string") {
      this.routerTpye(types, url, "strData", data)
      console.log("String")
    }

  },
  // 判断带参类型
  routerTpye(types,url,dataType,data){
    if( types == 1 ){
      wx.navigateTo({
        url: url + "?"+ dataType + "=" + data,
      })
    } else if(types == 2){
      wx.redirectTo({
        url: url + "?" + dataType + "=" + data,
      })
    }else if(types == 3){
      wx.switchTab({
        url: url
      })
    }else{
      wx.reLaunch({
        rl: url + "?" + dataType + "=" + data,
      })
    }
  },
  // 获取上页面
  getDataType(data){
    if( data.arrData ){
      return data.arrData.split(",")
    }
    if (data.objData){
      return JSON.parse(data.objData)
    }
    if (data.strData) {
      return data.strData
    }
  }

})