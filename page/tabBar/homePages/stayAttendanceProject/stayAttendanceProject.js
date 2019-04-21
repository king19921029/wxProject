var app = getApp();
Page({
  data: {
    id:""
  },
  onLoad: function (options) {

    this.setData({
      id: options.id,
    })
  },
  onShow: function () {
    var that = this;
    //tab数据
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirmDetail",
      { id: that.data.id},
      "post", function (res) {
        console.log("表格数据：", res.data.data)
        if (res.data.code == 0) {
          var data = res.data.data;
          that.setData({
            tabData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
    //考勤明细
    app.wxRequest("gongguan/api/wechat/myAttendanceWaitConfirm",
      { page: 1 },
      "post", function (res) {
        console.log("考勤明细", res.data.data);
        if (res.data.code == 0) {
         
          var arr = [];
          var data = res.data.data.t;
          for( var i = 0;i<data.length;i++ ){
            if (data[i].id == that.data.id ){
              arr.push(data[i])
            }
          }
          that.setData({
            mineData: arr
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
    })
  },
  onHide: function () {

  },
  // 浮层确认
  confirmaedTap: function () {
    // 个人考勤待办
    app.wxRequest("gongguan/api/wechat/myAttendanceConfirm",
      { id: this.data.id },
      "post", function (res) {
        console.log("确认考勤：", res.data.data);
        if (res.data.code == 0) {
          var data = res.data.data;
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },

})