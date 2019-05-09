var app = getApp();
Page({
  data: {
    workTypeName: [],
    workType: {},
    cityCode:[],
    region: [],
    allData:{},
    font_num:0,
    date:"",
    content:"",
  },
  onLoad: function (options) {

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
  getName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取手机号
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
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
    let wkId = "allData.wkId";

    this.setData({
      [wkType]: this.data.workTypeName[e.detail.value],
      [wkId]: data[e.detail.value].id
    })
  },
  // 获取字数
  getVal: function (e) {
    console.log(e.detail.value);
    let font_num = e.detail.value.length;
    this.setData({
      content: e.detail.value,
      font_num: font_num
    })
  },
  //修改
  next: function () {
    const that = this;
    let allData = that.data.allData || {};
    let phone = that.data.phone;
    let userName = that.data.userName;
    let workType = allData.wkId || "";
    let provinceCode = that.data.cityCode[0];
    let cityCode = that.data.cityCode[1];
    let countyCode = that.data.cityCode[2];
    let province = that.data.region[0];
    let city = that.data.region[1];
    let county = that.data.region[2];
    let date = that.data.date;
    let content = that.data.content;
    
    if (phone && userName && workType && provinceCode && cityCode && countyCode && province && city && county && date && content){
      app.wxRequest("gongguan/api/wechat/releaseJobWanted",
        {
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
            if (res.data.data) {
              app.showLoading2("保存成功", 'none')
            }
          } else {
            app.showLoading(res.data.msg, "none");
          }
      })
    }else{
      app.showLoading("每项都必须填写","none")
    }
    
  }

})