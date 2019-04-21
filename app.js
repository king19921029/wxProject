

App({
  // 全局数据，类似于store
  globalData: {
    city:"北京",//城市
    groupId: "4001201904140000001",//班组id
    openid: null,
    token:null,
    url: 'http://www.jinbionline.com',
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "version": "0",
      "openId":"",
      "authorization":""
    },
  },
  onLaunch: function (opts) {
    var that = this;
    let token = wx.getStorageSync("token") || "";
    that.globalData.header["authorization"] = token;
    that.globalData.token = token
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
        typeof success == 'function' && success(res)
      },
      fail: function (res) {
        typeof fail == 'function' && fail(res)
      }
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
