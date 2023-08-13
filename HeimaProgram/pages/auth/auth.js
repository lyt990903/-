import {
  getToken
} from '../../request/home.js';

// pages/auth/auth.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const canIUse = wx.canIUse('button.open-type.getUserInfo');
    this.setData({
      canIUse
    })
  },
  handleGetUserInfo(e) {
    // console.log(e);
    if (e.detail.userInfo) {
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail;
      wx.login({
        timeout: 10000,
        success(res) {
          // console.log(res);
          const {
            code
          } = res;
          const loginParam = {
            encryptedData,
            rawData,
            iv,
            signature,
            code
          }
          // 必须要企业账号
          getToken(loginParam).then(data => {
            // console.log(data);
            wx.setStorageSync("token", data.data);
            wx.navigateBack({
              delta: 1
            })
          })
        }
      })
    }
  }
})