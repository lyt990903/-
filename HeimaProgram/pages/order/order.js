// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['全部','待付款','代收货','退款/退货'],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentIndex: options.type
    })
  }
})