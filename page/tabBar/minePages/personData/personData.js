var app = getApp();
Page({
  data: {
    mz: {
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
    edArr: ["初中", "高中", "职高", "大专", "本科", "研究生"],
    workTypeName:[],
    workType:{},
    edType:"请选择文化程度",
    edId:"",
    wkType:"请选择主要技能",
    bankData:{},
    allData:{},
    mzVal: "",
    mzCode: "",
    egreeVal: [],
    region: [],
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
    this.setData({
      mz: arr
    })
  },
  onShow: function () {
    var that = this;
    // 工种
    app.wxRequest("gongguan/api/wechat/getWorkType",
      {},
      "post", function (res) {
 
        if (res.data.code == 0) {
          var data = res.data.data;
          var arr = [];
          for( var i = 0;i < data.length;i++ ){
            arr.push(data[i].name)
          }
          that.setData({
            workType: res.data.data,
            workTypeName:arr        
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 获取银行卡
    app.wxRequest("gongguan/api/wechat/getBankCard",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            bankData:data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 页面数据
    app.wxRequest("gongguan/api/wechat/personnelCenter",
      {},
      "post", function (res) {
        console.log("页面数据：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            allData: data,
            mzVal: data.folkName || "",
            mzCode: data.folk || "",
            xwVal: data.egreeName || "",
            xwidx: data.egree || "",
            zval: data.politicalName || "",
            zidx: data.political || "",
            regionCode: data.regionCode||[],
            region: data.regionName || []
          })
          
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    // 学位
    app.wxRequest("gongguan/api/wechat/getEgree",
      {},
      "post", function (res) {
        if (res.data.code == 0) {
          let egreeVal = [];
          let egreeidx = [];
          let datas = res.data.data;
          for (var item in datas) {
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
  go_photo(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/changePhoto/changePhoto',
    })
  },
  onHide: function () {
    var that = this;
    let educationLevel = that.data.allData.edId || "";
    let skill = that.data.allData.wkId || "";
    if (educationLevel != "" || skill !=""){
      app.wxRequest("gongguan/api/wechat/savePersonalInfo",
        {
          skill: skill,
          educationLevel: educationLevel
        },
        "post", function (res) {
          console.log("保存资料:", res.data.data)
          if (res.data.code == 0) {

          } else {
            app.showLoading(res.data.msg, "none");
          }
        })
    }
    let folk = that.data.mzCode || "";
    let egree = that.data.xwidx || "";
    let political = that.data.zidx || "";
    let region = that.data.region || [];
    let regionCode = that.data.regionCode || [];
    // 民族修改
    app.wxRequest("gongguan/api/wechat/updateFolk",
    { folk: folk },
    "post", function (res) {
      if (res.data.code == 0) {
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    //学位
    app.wxRequest("gongguan/api/wechat/updateEgree",
      { egree: egree },
    "post", function (res) {
      if (res.data.code == 0) {
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    //政治面貌
    app.wxRequest("gongguan/api/wechat/updatePolitical",
      { political: political },
    "post", function (res) {
      if (res.data.code == 0) {
      } else {
        app.showLoading(res.data.msg, "none");
      }
    })
    if ( region.length > 0 ){
      // 籍贯
      app.wxRequest("gongguan/api/wechat/updateProvince",
      {
        provinceId: regionCode[0],
        province: region[0],
        cityId: regionCode[1],
        city: region[1],
        countryCode: regionCode[2],
        countryName: region[2],
      },
      "post", function (res) {
        if (res.data.code == 0) {
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    }
    
    

  },
  onUnload:function(){
    var that = this;
    let educationLevel = that.data.allData.edId || "";
    let skill = that.data.allData.wkId || "";
    if (educationLevel != "" || skill != "") {
      app.wxRequest("gongguan/api/wechat/savePersonalInfo",
        {
          skill: skill,
          educationLevel: educationLevel
        },
        "post", function (res) {
          console.log("保存资料:", res.data.data)
          if (res.data.code == 0) {

          } else {
            app.showLoading(res.data.msg, "none");
          }
        })
    }
  },
  // 城市选择
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value,
      regionCode: e.detail.code
    })
  },
  // 民族
  bindMzChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      mzVal: this.data.mz[e.detail.value].name,
      mzCode: this.data.mz[e.detail.value].id,
    })
  },
  // 学位
  bindXwChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      xwVal: this.data.egreeVal[e.detail.value],
      xwidx: this.data.egreeidx[e.detail.value],
    })
  },
  // 政治
  bindzzChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zval: this.data.zzval[e.detail.value],
      zidx: this.data.zzidx[e.detail.value],
    })
  },
  // 学历选择
  // bindPickerChange(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   let edType = "allData.degreeEducation";
  //   let edId = "allData.edId";
  //   this.setData({
  //     [edId]: e.detail.value,
  //     [edType]: this.data.edArr[e.detail.value],
  //   })
  // },
  // 学历选择
  bindPickerChange(e) { 
    var edCode;
    let val = Number(e.detail.value) + 1;

    if (val < 6) {
      edCode = "0" + val
    } else {
      edCode = "99"
    }
    let edType = "allData.degreeEducation";
    let edId = "allData.edId";
    this.setData({
      [edId]: edCode,
      [edType]: this.data.edArr[e.detail.value]
    })
  },
  //技能
  pickerSkill(e){
    let data = this.data.workType;
    let wkType = "allData.skill";
    let wkId = "allData.wkId";

    this.setData({
      [wkType]: this.data.workTypeName[e.detail.value],
      [wkId]: data[e.detail.value].id
    })
  },
  // 去绑定银行卡
  go_bindBank:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/bindBankCard/bindBankCard'
    })
  },
  // 更改手机号
  go_changePhone: function () {
    wx.navigateTo({
      url: '/page/tabBar/minePages/changePhone/changePhone'
    })
  },
  // 身份认证中心   authenticationAll
  go_authent:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/authenticationAll/authenticationAll'
    })
  },
  // 确认密码
  go_pass:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/setPassword/setPassword'
    })
  },
  // 去修改密码
  go_chage:function(){
    wx.navigateTo({
      url: '/page/tabBar/minePages/chagePassword/chagePassword'
    })
  }

})