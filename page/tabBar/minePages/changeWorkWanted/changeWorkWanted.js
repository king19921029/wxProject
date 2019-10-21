var app = getApp();
Page({
  data: {
    workTypeName: [],
    workType: {},
    date:"",
    region: [],
    allData:{},
    content:"",
    font_num:0,
    cityCode:[],
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
    app.wxRequest("gongguan/api/wechat/getJobDetail",
      { id: options.id},
      "post", function (res) {
        console.log("allData：", res.data.data)
        if (res.data.code == 0) {
          let cityCode = [];
          let region = [];
          region[0] = res.data.data.province
          region[1] = res.data.data.city
          region[2] = res.data.data.county

          cityCode[0] = res.data.data.provinceCode
          cityCode[1] = res.data.data.cityCode
          cityCode[2] = res.data.data.countyCode
          

         that.setData({
           allData:res.data.data,
           region: region,
           date: res.data.data.expiryDate,
           content: res.data.data.content,
           font_num: res.data.data.content.length,
           cityCode: cityCode
         })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onShow: function () {
    var that = this;
    // 工种
    app.wxRequest("gongguan/api/wechat/getWorkType",
      {},
      "post", function (res) {
        console.log("工种：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          var arr = [];
          for (var i = 0; i < data.length; i++) {
            arr.push(data[i].name)
          }
          that.setData({
            workType: res.data.data,
            workTypeName: arr
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  // 获取姓名
  getName:function(e){
    let name = "allData.userName";
    this.setData({
      [name]: e.detail.value
    })
  },
  // 获取手机号
  getPhone: function (e) {
    let phone = "allData.phone";
    this.setData({
      [phone]: e.detail.value
    })
  },
  // 城市选择
  bindRegionChange(e) {

    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value,
      cityCode: e.detail.code,
    })
  },
  // 确认
  getList: function () {
    var that = this;
    app.wxRequest("gongguan/api/wechat/infoFeedback",
      {},
      "post", function (res) {
        console.log("求职信息：", res.data.data)
        if (res.data.code == 0) {

        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  // 日期选择
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //技能
  pickerSkill(e) {
    let data = this.data.workType;
    let wkType = "allData.skill";
    let workTypeId = "allData.workTypeId";

    this.setData({
      [wkType]: this.data.workTypeName[e.detail.value],
      [workTypeId]: data[e.detail.value].id
    })
  },
  // 获取字数
  getVal:function(e){
    console.log(e.detail.value);
    let font_num = e.detail.value.length;
    this.setData({
      content: e.detail.value,
      font_num: font_num
    })
  },
  //修改
  next:function(){
    const that = this;
    let allData = that.data.allData;
    let id = that.data.id;
    let phone = allData.phone;
    let userName = allData.userName;
    let workType = allData.workTypeId;
    let provinceCode = that.data.cityCode[0];
    let cityCode = that.data.cityCode[1];
    let countyCode = that.data.cityCode[2];
    let province = that.data.region[0];
    let city = that.data.region[1];
    let county = that.data.region[2];
    let date = allData.expiryDate;
    let content = allData.content;
    if (phone && userName && workType && provinceCode && cityCode && countyCode && province && city && county && date && content) {
      app.wxRequest("gongguan/api/wechat/releaseJobWanted",
        {
          id:id,
          userName: userName,
          phone: phone,
          workType: workType,
          provinceCode: provinceCode,
          cityCode: cityCode,
          countyCode: countyCode,
          province: province,
          city: city,
          county: county,
          date: date,
          content: content,
        },
        "post", function (res) {
        console.log("allData：", res.data.data)
        if (res.data.code == 0) {
          that.setData({
            allData: res.data.data,
            region: res.data.data.address,
            date: res.data.data.expiryDate,
            content: res.data.data.content,
            font_num: res.data.data.content.length
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
    }else{
      app.showLoading("每项都必须填写", "none")
    }
  }

})