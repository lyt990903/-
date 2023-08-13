// pages/index/index.js
import {
  getSwiperImg,
  getCateImg,
  getFloorImg
} from '../../request/home.js';

Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  onLoad: function(options) {
    // 加载轮播图图片 
    this._getSwiperImg();
    // 加载导航图片
    this._getCateImg();
    // 获取楼层图片
    this._getFloorImg();
  },

  // ---------------- 封装请求函数 ----------------
  _getSwiperImg() {
    getSwiperImg().then(data => {
      // console.log(data);
      this.setData({
        swiperList: data.data.message
      })
    })
  },
  _getCateImg() {
    getCateImg().then(data => {
      // console.log(data);
      this.setData({
        cateList: data.data.message
      })
    })
  },
  _getFloorImg() {
    getFloorImg().then(data => {
      // console.log(data);
      this.setData({
        floorList: data.data.message
      })
    })
  }
})