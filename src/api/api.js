import request from '@/utils/request'


// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/mengtan/userInfo',
    method: 'get',
  })
}

// 基本资料
export function getInfo() {
  return request({
    url: '/mengtan/info',
    method: 'get'
  })
}

// tabcharts
export function getTabcharts() {
  return request({
    url: '/mengtan/tab_charts',
    method: 'get'
  })
}


// 采购列表
export function getShopList() {
  return request({
    url: '/mengtan/shop_list',
    method: 'get'
  })
}

// 新闻列表
export function getNewsList() {
  return request({
    url: '/mengtan/news_list',
    method: 'get'
  })
}

// 新闻类别
export function getNews_category() {
  return request({
    url: '/mengtan/news_category',
    method: 'get'
  })
}

// 更多新闻列表
export function all_news_list(query) {
  return request({
    url: '/mengtan/all_news_list',
    method: 'get',
    params: query
  })
}
// 更多新闻列表
export function newsDetail(query) {
  return request({
    url: '/mengtan/news_detail',
    method: 'get',
    params: query
  })
}

// 热门产品
export function hotProduct() {
  return request({
    url: '/mengtan/hot_product',
    method: 'get'
  })
}

// 议价
export function bargaining(data) {
  return request({
    url: '/mengtan/bargaining',
    method: 'post',
    data: data
  })
}

// 采购
export function buyGoods(data) {
  return request({
    url: '/mengtan/buy',
    method: 'post',
    data: data
  })
}
