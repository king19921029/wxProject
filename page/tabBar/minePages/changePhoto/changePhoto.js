var app = getApp()
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
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imageP: tempFilePaths
        })
        wx.showLoading({
          title: '上传中'
        })
        wx.uploadFile({
          url: app.globalData.url + '/gongguan/api/wechat/personPic/1',
          header: app.globalData.header,
          filePath: tempFilePaths[0],
          type: 1,
          fileFiel: tempFilePaths[0],
          name: 'fileField',
          success(res) {
            console.log(res)
            let urlData = JSON.parse(res.data);
            console.log(urlData)
            if (urlData.code == "0") {
              wx.hideLoading();
              that.setData({
                imageP: urlData.data
              })
            } else {
              app.showLoading(urlData.msg, "none")
            }

          }
        })
      }
    })
  },
  // 确认修改
  upodateFace:function(){
    var that = this;
    app.wxRequest("gongguan/api/wechat/upodateFace",
      { headPic: that.data.imageP },
      "post", function (res) {
        if (res.data.code == 0) {
          if( res.data.data ){
            wx.navigateBack()
          }else{
            app.showLoading("修改失败","none")
          }
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },

})