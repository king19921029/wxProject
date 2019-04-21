Page({

  data: {
    myData:"",
  },
  loadMyData(){

    console.log(获取到的数据为： + this.data.myData)

  },
  onload: function () {
    wx.request({
      url: https://api, 
      success: res => {
        console.log(res.data)
        this.setData({
          myData: res.data
        })
        console.log(this.data.myData)
      }
    })
    this.loadMyData()
  }

})