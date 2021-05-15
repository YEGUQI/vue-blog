import { request } from "./request";

// 获取精选文章数据
export function getsiftArticlesList (info) {
  return request({
    method: "get",
    url: "home/siftArticles",
    params: info
  })
}

// 获取普通文章数据
export function getArticlesList (info) {
  return request({
    method: "get",
    url: "home/articles",
    params: info
  })
}