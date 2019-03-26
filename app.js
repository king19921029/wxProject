

App({
  onLaunch: function (opts) {
    console.log('App Launch', opts)
  },
  onShow: function (opts) {
    console.log('App Show', opts)
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
})
