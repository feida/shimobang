import request from '@/utils/request'




// 上传
export function uploadExcel(type, file) {
  return request({
    url: '/report-bi/file/uploadExcel',
    method: 'post',
    data: {
      type,
      file
    }
  })
}

// 下载模板
export function downLoad(query) {
  return request({
    url: '/report-bi/file/getTemplateUrlByType',
    method: 'get',
    params: query
  })
}

// menu
export function getMenus() {
  return request({
    url: '/report-bi/report/menus',
    method: 'get'
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
