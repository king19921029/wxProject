// components/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getVal: function (e) {
      const myEventDetail = {
        val: e.detail.value
      }
      this.triggerEvent('fgetVal', myEventDetail)
    },
    _none_tap:function(){
      this.triggerEvent('fno_tap')
    },
    _confirmaed:function(){
      this.triggerEvent('fconfirmTap')
    }
  }
})
