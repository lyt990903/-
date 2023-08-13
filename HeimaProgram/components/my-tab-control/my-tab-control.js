// components/my-tab-control/my-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0,
      observer: function(newVal,oldVal){
        this.setData({
          currentIndex: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabItemClick(event) {
      let currentIndex = event.currentTarget.dataset.index;
      this.setData({
        currentIndex
      });
      this.triggerEvent("tabItemClick", {
        index: this.data.currentIndex
      }, {});
    }
  }
})