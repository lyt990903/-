// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  handleGetUserInfo() {
    wx.getUserInfo({
      success(res) {
        // console.log(res);
        wx.setStorageSync("userInfo", res.userInfo);
        wx.navigateBack({
          delta: 1
        })
      },
      fail(err) {
        wx.showModal({
          title:"提示",
          content:"请登录后获取信息",
          showCancel: false
        })
      }
    })
  }
})