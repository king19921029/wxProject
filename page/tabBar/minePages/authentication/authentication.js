// 140322199006304391
var app = getApp();
Page({
  data: {
    imageP:"",//头像
    imageZ:"",//正面
    imageF:"",//反面
    region: [""],
    edArr:["初中","高中","职高","大专","本科","研究生"]
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
          header: app.globalData.header,
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
          header: app.globalData.header,
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
                imageZ: urlData.data
              })
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
          header: app.globalData.header,
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
                imageF: urlData.data
              })
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
    var that = this;
    app.wxRequest("gongguan/api/wechat/auth",
      {  
        userName: that.data.userName, 
        idNum: that.data.idNum,
        address: that.data.address,
        personPic: that.data.imageP,
        idCardFrontPic: that.data.imageZ,
        idCardBackPic: that.data.imageF,
      },
      "post", function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/page/tabBar/minePages/authenticationRes/authenticationRes?types=1'
          })
          that.setData({
            monthData: res.data.data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  getName:function(e){
    console.log(e.detail.value);
    this.setData({
      userName: e.detail.value
    })
  },
  getNum: function (e) {
    console.log(e.detail.value);
    this.setData({
      idNum: e.detail.value
    })
  },
  getCity: function (e) {
    console.log(e.detail.value);
    this.setData({
      address: e.detail.value
    })
  },
  // 城市选择
  bindRegionChange(e) {
    
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value
    })
  },
  // 学历选择
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      edType: this.data.edArr[e.detail.value]
    })
  },


})