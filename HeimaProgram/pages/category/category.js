import {
  getCateList
} from '../../request/home.js';

// pages/category/category.js
Page({
  data: {
    leftMenuList: [],
    rightContent: []
  },
  // 整体数据
  Cates: [],
  onLoad: function(options) {
    // 获取列表数据
    this._getCateList();
  },

  // ---------------- 封装请求函数 ----------------
  _getCateList() {
    // 缓存数据
    const cates = wx.getStorageSync("catelist");
    // 如果没有数据或者数据过期(10s)
    if (!cates || (Date.now() - cates.time > 1000 * 10)) {
      getCateList().then(data => {
        // console.log(data);
        this.Cates = data.data.message;
        wx.setStorageSync("catelist", {
          time: Date.now(),
          data: this.Cates
        });
        const leftMenuList = this.Cates.map(item => (item.cat_name));
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
    } else {
      this.Cates = cates.data;
      const leftMenuList = this.Cates.map(item => (item.cat_name));
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    }
  },

  // ---------------- 事件绑定函数 ----------------
  handleMenuItemClick(data) {
    let index = data.detail.index;
    let rightContent = this.Cates[index].children;
    this.setData({
      rightContent
    })
  }
})