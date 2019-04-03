
Page({
  data: {
    selectStatus: 0,
    headerBorder: true ,//header添加border
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  // header切换
  myProject: function () {
    this.setData({
      headerBorder: true
    })
  },
  youProject: function () {
    this.setData({
      headerBorder: false
    })
  },
  // 项目
  peojectTap: function () {
    this.setData({
      selectStatus: 1
    })
  },
  // 班组
  classTap: function () {
    this.setData({
      selectStatus: 2
    })
  },

})