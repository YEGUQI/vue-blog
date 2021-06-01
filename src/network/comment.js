import { request } from "./request";
import qs from "qs";
// 发布新评论
export function postAddComment (info) {
  return request({
    method: "post",
    url: "home/comment/add",
    data: qs.stringify(info),
  })
}

// 根据 id 删除对应的评论
export function deleteCommentById (id) {
  return request({
    method: "delete",
    url: "home/comment/" + id,
  })
}

// 评论 回复
export function CommentBack (info) {
  return request({
    method: "post",
    url: "home/comment/back",
    data: qs.stringify(info),
  })
}

// 根据 id 删除对应的评论的回复
export function deleteCommentBackById (id) {
  return request({
    method: "delete",
    url: "home/comment/back/" + id,
  })
}