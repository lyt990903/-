// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goodsList: [],
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function() {
    const address = wx.getStorageSync("address") || {};
    const goodsList = wx.getStorageSync("cart") || [];
    this.setData({
      address
    });
    this.caculate(goodsList);
  },
  // -------------------- 绑定事件函数 --------------------
  handleGetAddress(event) {
    const address = event.detail.address;
    // console.log(address);
    this.setData({
      address
    });
  },
  handleNumEditClick(data) {
    let {
      goodsList
    } = this.data;
    const {
      id,
      operation
    } = data.detail;
    const index = goodsList.findIndex(item => (item.goods_id == id));
    goodsList[index].num += operation;
    // console.log(typeof operation);
    if (goodsList[index].num <= 1) {
      goodsList[index].num = 1;
    }
    this.caculate(goodsList);
    wx.setStorageSync("cart", goodsList);
  },
  handleChkChange(event) {
    // console.log(event.detail.changedId);
    const {
      changedId
    } = event.detail;
    let {
      goodsList
    } = this.data;
    const index = goodsList.findIndex(item => (item.goods_id == changedId));
    goodsList[index].checked = !goodsList[index].checked;
    this.caculate(goodsList);
    wx.setStorageSync("cart", goodsList);
  },
  handleAllChkChange() {
    let {
      goodsList,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    goodsList.forEach(item => {
      item.checked = allChecked;
    });
    this.caculate(goodsList);
    wx.setStorageSync("cart", goodsList);
  },
  handleItemLongTap(data) {
    // console.log(data);
    let {
      goodsList
    } = this.data;
    const index = goodsList.findIndex(item => (item.goods_id == data.detail.id));
    goodsList.splice(index, 1);
    this.caculate(goodsList);
    wx.setStorageSync("cart", goodsList);
  },
  handlePay() {
    const {
      address,
      totalNum
    } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '请选择收货地址',
        icon: "none"
      })
    } else if (totalNum == 0) {
      wx.showToast({
        title: '请选择至少一个商品',
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/pay/pay',
        success(res) {

        }
      })
    }
  },
  // -------------------- 工具封装函数 --------------------
  caculate(goodsList) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    goodsList.forEach(item => {
      if (item.checked) {
        totalPrice += item.goods_price * item.num;
        totalNum += item.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = goodsList.length == 0 ? false : allChecked;
    this.setData({
      goodsList,
      allChecked,
      totalPrice,
      totalNum
    })
  }
})