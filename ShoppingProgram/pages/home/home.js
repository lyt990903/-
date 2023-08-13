// pages/home/home.js
import {getMultiData,getGoodsData} from '../../service/home.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    recommend:[],
    tabControlTitles:['流行','新款','精选'],
    types:['pop','new','sell'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    showBackUp: false,
    isTabFixed:false,
    tabTop:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图
    this._getMultiData();
    // 请求商品列表
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  // ---------------- 请求数据函数 ------------------
  _getMultiData(){
    getMultiData().then(res => {
      const data = res.data.data;
      const banner = data.banner.list;
      const recommend = data.recommend.list;
      this.setData({
        banner,
        recommend
      })
    })
  },
  _getGoodsData(type){
    let page = this.data.goods[type].page + 1;
    getGoodsData(type,page).then(res => {
      const list = res.data.data.list;
      const goods = this.data.goods;
      const oldlist = goods[type].list;
      oldlist.push(...list);
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]:oldlist,
        [pageKey]:page
      })
    })
  },
  // ---------------- 事件绑定函数 ------------------
  handleTabClick(data){
    const index = data.detail.index;
    this.setData({
      currentType:this.data.types[index]
    })
  },
  handleImgLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      console.log(rect);
      this.data.tabTop = rect.top;
    }).exec()
  },
  onReachBottom(){
    this._getGoodsData(this.data.currentType);
  },
  onPageScroll(options){
    const flag1 = options.scrollTop >= 1000;
    if(flag1 != this.data.showBackUp){
      this.setData({
        showBackUp:flag1
      })
    }

    const flag2 = options.scrollTop >= this.data.tabTop;
    if(flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  }
})