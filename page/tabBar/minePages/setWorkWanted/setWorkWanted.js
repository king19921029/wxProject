var app = getApp();
Page({
  data: {
    workTypeName: [],
    workType: {},
    region: [""],
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
  // 城市选择
  bindRegionChange(e) {

    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value
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
    let wkId = "allData.wkId";

    this.setData({
      [wkType]: this.data.workTypeName[e.detail.value],
      [wkId]: data[e.detail.value].id
    })
  },

})