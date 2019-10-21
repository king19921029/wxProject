var app = getApp();
Page({
  data: {
    id: "",
    ggData:{}
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
    var that = this;
    // 公告列表
    app.wxRequest("gongguan/api/wechat/getMsgDetail",
      { id: that.data.id },
      "post", function (res) {
        console.log(res.data);
        var data = res.data.data;
        if (res.data.code == 0) {
          that.setData({
            ggData: data
          })
        } else {
          app.showLoading(res.data.msg, "none");
        }
      })
  },
  onHide: function () {

  },
  goDetails:function(e){
    let types = e.currentTarget.dataset.types;
    switch (types) {
      case 1:
        wx.navigateTo({
          url: '/page/tabBar/minePages/myProject/myProject',
        })
        break;
      case 2: 
        wx.navigateTo({
          url: '/page/tabBar/minePages/authentication/authentication',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/page/tabBar/minePages/myProject/myProject?types=3',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '/page/tabBar/minePages/myProject/myProject',
        })
        break;
      case 5:
        wx.navigateTo({
          url: '/page/tabBar/minePages/myProject/myProject',
        })
        break;
      default:
        wx.navigateTo({
          url: '/page/tabBar/minePages/myProject/myProject',
        })
    }
  }

})