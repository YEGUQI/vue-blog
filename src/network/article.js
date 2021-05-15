import { request } from "./request";

// 获取文章列表数据 
export function getAllArticlesList (info) {
  return request({
    method: "get",
    url: "admin/articles",
    params: info
  })
}

// 添加文章
export function addArticle (articleInfo) {
  return request({
    method: "post",
    url: "admin/articles/add",
    data: articleInfo
  })
}

// 删除文章
export function deleteArticle (id) {
  return request({
    method: "delete",
    url: "admin/articles/" + id,
  })
}

// 文章置顶
export function StickArticle (info) {
  return request({
    method: 'put',
    url: `admin/articles/${info._id}/isStick/${info.isStick}`
  })
}

// 根据 id 查找文章信息
export function findArticle (id) {
  return request({
    method: 'get',
    url: 'admin/articles/' + id
  })
}

// 修改文章信息
export function editArticle (info) {
  return request({
    method: 'put',
    url: 'admin/articles/edit',
    data: info
  })
}