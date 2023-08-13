// pages/pay/pay.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goodsList: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function() {
    const address = wx.getStorageSync("address") || {};
    const oldGoodsList = wx.getStorageSync("cart") || [];
    const goodsList = oldGoodsList.filter(item => (item.checked))
    let totalPrice = 0;
    let totalNum = 0;
    goodsList.forEach(item => {
      if (item.checked) {
        totalPrice += item.goods_price * item.num;
        totalNum += item.num;
      }
    })
    this.setData({
      address,
      goodsList,
      totalPrice,
      totalNum
    })
  },
  // -------------------- 事件绑定函数 --------------------
  handleOrderPay() {
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
    } else {
      // console.log("token已存在");
      // 删除购物车中的数据
      let cart = wx.getStorageSync("cart");
      cart = cart.filter(item => (item.checked == false));
      wx.setStorageSync("cart", cart);
      wx.switchTab({
        url: '/pages/cart/cart'
      })
    }
  }
})