// pages/category/childcpns/my-cates-container/my-cates-container.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: {
      type: Array,
      value: []
    },
    contentList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuItemClick(event) {
      const currentIndex = event.currentTarget.dataset.index;
      this.setData({
        currentIndex,
        // 右侧菜单置顶
        scrollTop: 0
      });
      this.triggerEvent("menuItemClick",{index:this.data.currentIndex},{});
    }
  }
})