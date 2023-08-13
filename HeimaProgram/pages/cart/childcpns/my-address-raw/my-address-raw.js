import getAddress from '../../../../utils/getAddress.js';

// pages/cart/childcpns/my-address-raw/my-address-raw.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Object,
      value: {}
    }
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
    handleGetAddress() {
      try {
        getAddress().then(address => {
          // console.log(address);
          wx.setStorageSync("address", address);
          this.triggerEvent("getAddress", {
            address
          }, {});
        })
      } catch (err) {
        console.log(err);
      }
    }
  }
})