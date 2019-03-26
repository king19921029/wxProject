

App({
  // 全局数据，类似于store
  globalData: {
    hasLogin: false,
    openid: null
  },
  onLaunch: function (opts) {
    console.log('App Launch', opts)
  },
  onShow: function (opts) {
    console.log('App Show', opts)
  },
})
