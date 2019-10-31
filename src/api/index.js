import { get, post } from '@/utils/request'
import { APP_ID, APP_SECRET } from '../utils/const'

const API_URL = 'https://test.youbaobao.xyz:18081'

export function getHomeData (params) {
  return get(`${API_URL}/book/home/v2`, params)
}

export function recommend () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function freeRead () {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function hotBook () {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

export function getOpenId (code) {
  return get(`${API_URL}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}

// mpvuePlatform 为全局变量  微信、支付宝、、、
export function register (openId, userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}

// 搜索
export function search (params) {
  return get(`${API_URL}/book/search`, params)
}

// 热门搜索
export function hotSearch () {
  return get(`${API_URL}/book/hot-search`)
}

// 图书详情
export function bookDetail (params) {
  return get(`${API_URL}/book/detail`, params)
}

// 评分
export function bookRankSave (params) {
  return get(`${API_URL}/book/rank/save`, params)
}

// 图书详情目录
export function bookContents (params) {
  return get(`${API_URL}/book/contents`, params)
}

// 书架列表
export function bookIsInShelf (params) {
  return get(`${API_URL}/book/shelf/get`, params)
}

// 加入书架
export function bookShelfSave (params) {
  return get(`${API_URL}/book/shelf/save`, {
    shelf: JSON.stringify(params)
  })
}

// 移出书架
export function bookShelfRemove (params) {
  return get(`${API_URL}/book/shelf/remove`, {
    shelf: JSON.stringify(params)
  })
}

// 图书列表
export function searchList (params) {
  return get(`${API_URL}/book/search-list`, params)
}

// 图书分类列表
export function categoryList () {
  return get(`${API_URL}/book/category/list/v2`)
}

export function userDay (params) {
  return get(`${API_URL}/user/day`, params)
}
