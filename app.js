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

})