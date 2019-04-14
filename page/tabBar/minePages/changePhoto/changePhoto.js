
Page({
  data: {
    blockIsShow: false,
    imageP: "",//头像
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 上传头像
  photoChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success(res) {
        // wx.showLoading({
        //   title: '上传中'
        // })
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imageP: tempFilePaths
        })
        wx.uploadFile({
          url: app.globalData.url + '/gongguan/api/wechat/personPic',
          filePath: tempFilePaths[0],
          // header: header,
          type: 1,
          name: 'fileField',
          success(res) {
            console.log(res)
            // let urlData = JSON.parse(res.data);
            // if (urlData.code == 0) {
            //   photoArr.push(urlData.data)
            //   wx.hideLoading();
            // } else {
            //   app.showLoading(urlData.msg, "none")
            // }

          }
        })
      }
    })
  },

})