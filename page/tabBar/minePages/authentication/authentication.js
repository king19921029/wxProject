var app = getApp();
Page({
  data: {
    imageP:"",//头像
    imageZ:"",//正面
    imageF:"",//反面
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  // 上传头像
  photoChooseImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: [ 'camera'],
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
          filePath: tempFilePaths[0],
          type:1,
          fileFiel: tempFilePaths[0],
          name: 'fileField',
          success(res) {
            console.log(res)
            let urlData = JSON.parse(res.data);
            console.log(urlData)
            if (urlData.code == "0") {
              wx.hideLoading();
              // that.setData({
              //   imageP: urlData.data
              // })
            } else {
              app.showLoading(urlData.msg, "none")
            }

          }
        })
      }
    })
  },
  //上传证件正面
  idCardChooseImageZ:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          imageZ:tempFilePaths
        })
        wx.showLoading({
          title: '上传中'
        })
        wx.uploadFile({
          url: app.globalData.url + '/gongguan/api/wechat/personPic/2',
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
              // that.setData({
              //   imageZ: urlData.data
              // })
            } else {
              app.showLoading(urlData.msg, "none")
            }

          }
        })
      }
    })
  },
  //上传证件反面
  idCardChooseImageF: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          imageF: tempFilePaths
        })
        wx.showLoading({
          title: '上传中'
        })
        wx.uploadFile({
          url: app.globalData.url + '/gongguan/api/wechat/personPic/3',
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
              // that.setData({
              //   imageF: urlData.data
              // })
            } else {
              app.showLoading(urlData.msg, "none")
            }

          }
        })
      }
    })
  },
  //下一步
  nextTap:function(){
    app.wxRequest("gongguan/api/wechat/auth",
      {  
        userName: "ll", 
        idNum: "13028319868176281",
        address:"河北省唐山市",
        personPic:"http://tmp/wx0aa6d2faa6e11d60.o6zAJs0vjfTL2dNrw59qOTVFAl58.8itsaSBuYWrU3d78097115e6b95e4b56f98d85f09460.png",
        idCardFrontPic:"http://tmp/wx0aa6d2faa6e11d60.o6zAJs0vjfTL2dNrw59qOTVFAl58.8itsaSBuYWrU3d78097115e6b95e4b56f98d85f09460.png",
        idCardBackPic:"http://tmp/wx0aa6d2faa6e11d60.o6zAJs0vjfTL2dNrw59qOTVFAl58.8itsaSBuYWrU3d78097115e6b95e4b56f98d85f09460.png",
      },
      "post", function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            monthData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  }


})