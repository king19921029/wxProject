// 140322199006304391
var app = getApp();
Page({
  data: {
    mz:{
    "01": "汉族",
    "02": "蒙古族",
    "03": "回族",
    "04": "藏族",
    "05": "维吾尔族",
    "06": "苗族",
    "07": "彝族",
    "08": "壮族",
    "09": "布依族",
    "10": "朝鲜族",
    "11": "满族",
    "12": "侗族",
    "13": "瑶族",
    "14": "白族",
    "15": "仫佬族",
    "16": "羌族",
    "17": "布朗族",
    "18": "撒拉族",
    "19": "毛南族",
    "20": "仡佬族",
    "21": "锡伯族",
    "22": "阿昌族",
    "23": "普米族",
    "24": "塔吉克族",
    "25": "怒族",
    "26": "乌孜别克族",
    "27": "俄罗斯族",
    "28": "鄂温克族",
    "29": "黎族",
    "30": "僳僳族",
    "31": "佤族",
    "32": "畲族",
    "33": "高山族",
    "34": "拉祜族",
    "35": "水族",
    "36": "东乡族",
    "37": "纳西族",
    "38": "景颇族",
    "39": "柯尔克孜族",
    "40": "土族",
    "41": "达斡尔族",
    "42": "塔塔尔族",
    "43": "土家族",
    "44": "哈尼族",
    "45": "哈萨克族",
    "46": "傣族",
    "47": "德昂族",
    "48": "保安族",
    "49": "裕固族",
    "50": "京族",
    "51": "独龙族",
    "52": "鄂伦春族",
    "53": "赫哲族",
    "54": "门巴族",
    "55": "珞巴族",
    "56": "基诺族"
  },
    mzVal:"",
    mzCode:"",
    egreeidx:[],
    egreeVal:[],
    edCode:"",
    xwVal:"",
    xwidx:"",
    zzidx:[],
    zzval:[],
    imageP:"",//头像
    imageZ:"",//正面
    imageF:"",//反面
    region: [""],
    edArr:["初中","高中","职高","大专","本科","研究生"],
    egree:{},//学位
    userName:"",
    idNum:"",
    address:"",

  },
  onLoad: function (options) {
    let obj = this.data.mz;
    var arr = [];
    for (var key in obj) {
      arr.push({
        id: key,
        name: obj[key]
      })
    }
    console.log(arr);
    this.setData({
      mz:arr
    })
  },
  onShow: function () {
    var that = this;
    // 学位
    app.wxRequest("gongguan/api/wechat/getEgree",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          let egreeVal = [];
          let egreeidx = [];
          let datas = res.data.data;
          for (var item in datas){
            egreeidx.push(item)
            egreeVal.push(datas[item])
          }
          that.setData({
            egreeVal: egreeVal,
            egreeidx: egreeidx
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 政治面貌
    app.wxRequest("gongguan/api/wechat/getPolitical",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          let zzval = [];
          let zzidx = [];
          let datas = res.data.data;
          for (var item in datas) {
            zzidx.push(item)
            zzval.push(datas[item])
          }
          that.setData({
            zzval: zzval,
            zzidx: zzidx
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  success(res){
    console.log(res.detail)
    this.setData({
      userName: res.detail.name,
      idNum: res.detail.id,
      address: res.detail.homePlace,
    })
  },
  // 上传头像
  photoChooseImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      // sizeType: ['original', 'compressed'],
      // sourceType: ['album', 'camera'],
      sizeType: [ 'compressed'],
      sourceType: [ 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
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
    // 城市
    let citys = that.data.region;
    // 文化
    let edType = that.data.edType;
    // 地址
    let address = that.data.address;
    // code
    let regionCode = that.data.regionCode;
    // 学位
    let xwidx = that.data.xwidx;
    // 民族
    let mzCode = that.data.mzCode;
    // 政治面貌
    let zidx = that.data.zidx;
    if (citys && edType && address && regionCode && xwidx && mzCode && zidx ){
      // 0721改
      app.wxRequest("gongguan/api/wechat/v2/auth",
        {
          userName: that.data.userName,
          idNum: that.data.idNum,
          address: that.data.address,
          personPic: that.data.imageP.realUrl,
          idCardFrontPic: that.data.imageZ.realUrl || "",
          idCardBackPic: that.data.imageF.realUrl || "",
          egreeEducation: that.data.edCode,
          province: citys[0],
          city: citys[1],
          country: citys[2],
          provinceCode: regionCode[0],
          cityCode: regionCode[1],
          countryCode: regionCode[2],
          egree: zidx,
          political: zidx,
          folk: mzCode,
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
    }else{
      app.showLoading("请把信息填写完整",'none')
    }
    
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
      region: e.detail.value,
      regionCode: e.detail.code
    })
  },
  // 学历选择
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      edType: this.data.edArr[e.detail.value],
      edCode: e.detail.value
    })
  },
  bindMzChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      mzVal: this.data.mz[e.detail.value].name,
      mzCode: this.data.mz[e.detail.value].id,
    })
  },
  bindXwChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      xwVal: this.data.egreeVal[e.detail.value],
      xwidx: this.data.egreeidx[e.detail.value],
    })
  },
  bindzzChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zval: this.data.zzval[e.detail.value],
      zidx: this.data.zzidx[e.detail.value],
    })
  }


})