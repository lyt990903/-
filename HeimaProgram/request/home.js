import my_request from './network.js';
import {
  baseURL
} from './config.js';


// -------------------- 首页数据请求 --------------------
export function getSwiperImg() {
  return my_request({
    url: baseURL + '/home/swiperdata'
  })
}
export function getCateImg() {
  return my_request({
    url: baseURL + '/home/catitems'
  })
}
export function getFloorImg() {
  return my_request({
    url: baseURL + '/home/floordata'
  })
}
// -------------------- 分类页数据请求 --------------------
export function getCateList() {
  return my_request({
    url: baseURL + '/categories'
  })
}
// -------------------- 商品列表页数据请求 --------------------
export function getGoodsList(params) {
  return my_request({
    url: baseURL + '/goods/search',
    data: params
  })
}
// -------------------- 商品详情页数据请求 --------------------
export function getGoodsDetail(goods_id) {
  return my_request({
    url: baseURL + '/goods/detail',
    data: {
      goods_id
    }
  })
}
// -------------------- 登陆后token数据请求 --------------------
export function getToken(data) {
  return my_request({
    url: baseURL + '/users/wxlogin',
    data,
    method: "POST"
  })
}