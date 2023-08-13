import {
  getGoodsList
} from '../../request/home.js';

// pages/goods_list/goods_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['综合', '销量', '价格'],
    goodsList: []
  },
  // 数据请求参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    total: 0
  },
  // 节流阀
  throttle: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryParams.cid = options.cid;
    // 请求数据
    this._getGoodsList(this.queryParams);
  },
  // ---------------- 封装请求函数 ----------------
  _getGoodsList(params) {
    if (this.throttle) {
      return;
    } else {
      // 打开节流阀
      this.throttle = true;
      // 显示加载中
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      // 获取数据
      getGoodsList(params).then(data => {
        // console.log(data);
        this.queryParams.total = data.data.message.total;
        let newList = data.data.message.goods;
        let goodsList = this.data.goodsList;
        goodsList.push(...newList);
        this.setData({
          goodsList
        });
        this.queryParams.pagenum++;
        wx.stopPullDownRefresh();
        // 关闭加载
        wx.hideLoading();
        // 关闭节流阀
        this.throttle = false;
      })
    }
  },
  // ---------------- 事件绑定函数 ----------------
  handleTabItemClick(data) {
    // console.log(data);
    let index = data.detail.index;
  },
  onReachBottom() {
    if (this.queryParams.pagenum > Math.ceil(this.queryParams.total / this.queryParams.pagesize)) {
      wx.showToast({
        title: '数据已经加载完啦'
      })
    } else {
      this._getGoodsList(this.queryParams);
    }
  },
  onPullDownRefresh() {
    // 初始化参数
    this.queryParams.pagenum = 1;
    this.queryParams.total = 0;
    this.setData({
      goodsList: []
    });
    // 重新请求
    this._getGoodsList(this.queryParams);
  }
})