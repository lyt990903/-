import {
  getGoodsDetail
} from '../../request/home.js';

// pages/goods_detail/goods_detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    this._getGoodsDetail(options.goods_id);
  },
  // -------------------- 事件绑定函数 --------------------
  handlePreviewImage(event) {
    let {
      pics
    } = this.data.goodsInfo;
    const {
      index
    } = event.currentTarget.dataset;
    if (pics) {
      wx.previewImage({
        urls: pics.map(item => (item.pics_mid)),
        current: pics[index]
      })
    }
    // console.log(pics,pics[index]);
  },
  handleCartAdd() {
    const goodsinfo = this.data.goodsInfo;
    let cart = wx.getStorageSync("cart") || [];
    const index = cart.findIndex(item => (item.goods_id === goodsinfo.goods_id));
    if (index == -1) {
      const goods_info = {
        ...goodsinfo,
        num: 1,
        checked: true
      }
      cart.push(goods_info);
    } else {
      num: cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功!',
      mask: true
    })
  },
  // -------------------- 封装请求函数 --------------------
  _getGoodsDetail(goods_id) {
    getGoodsDetail(goods_id).then(data => {
      // console.log(data);
      let {
        goods_id,
        pics,
        goods_name,
        goods_price,
        goods_introduce
      } = data.data.message;
      this.setData({
        goodsInfo: {
          goods_id,
          pics,
          goods_name,
          goods_price,
          goods_introduce: goods_introduce.replace(/\.webp/g, ".jpg")
        }
      })
    })
  }
})